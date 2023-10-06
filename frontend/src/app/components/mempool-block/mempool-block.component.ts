import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map, tap, filter } from 'rxjs/operators';
import { MempoolBlock, TransactionStripped } from '../../interfaces/websocket.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { seoDescriptionNetwork } from '../../shared/common.utils';
import { WebsocketService } from '../../services/websocket.service';
import { BlockchainApiService } from '../../services/inscriptions/blockchain-api.service';
import { InscriptionFetcherService } from '../../services/inscriptions/inscription-fetcher.service';

@Component({
  selector: 'app-mempool-block',
  templateUrl: './mempool-block.component.html',
  styleUrls: ['./mempool-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MempoolBlockComponent implements OnInit, OnDestroy {
  network$: Observable<string>;
  mempoolBlockIndex: number;
  mempoolBlock$: Observable<MempoolBlock>;
  mempoolBlockTransactions$: Observable<TransactionStripped[]>;
  ordinal$: BehaviorSubject<string> = new BehaviorSubject('');
  previewTx: TransactionStripped | void;
  webGlEnabled: boolean;

  constructor(
    private route: ActivatedRoute,
    public stateService: StateService,
    private seoService: SeoService,
    private websocketService: WebsocketService,
    private blockchainApiService: BlockchainApiService,
    private inscriptionFetcherService: InscriptionFetcherService

  ) {
    this.webGlEnabled = detectWebGL();
  }

  ngOnInit(): void {

    // boost our inscriptions chache with data from blockchain.info
    // to speed things up! 🚀
    this.blockchainApiService.fetchAndCacheManyUnconfirmedTransactions();

    this.websocketService.want(['blocks', 'mempool-blocks']);

    this.mempoolBlock$ = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.mempoolBlockIndex = parseInt(params.get('id'), 10) || 0;
          return this.stateService.mempoolBlocks$
            .pipe(
              map((blocks) => {
                if (!blocks.length) {
                  return [{ index: 0, blockSize: 0, blockVSize: 0, feeRange: [0, 0], medianFee: 0, nTx: 0, totalFees: 0 }];
                }
                return blocks;
              }),
              filter((mempoolBlocks) => mempoolBlocks.length > 0),
              map((mempoolBlocks) => {
                while (!mempoolBlocks[this.mempoolBlockIndex]) {
                  this.mempoolBlockIndex--;
                }
                const ordinal = this.getOrdinal(mempoolBlocks[this.mempoolBlockIndex]);
                this.ordinal$.next(ordinal);
                this.seoService.setTitle(ordinal);
                this.seoService.setDescription($localize`:@@meta.description.mempool-block:See stats for ${this.stateService.network==='liquid'||this.stateService.network==='liquidtestnet'?'Liquid':'Bitcoin'}${seoDescriptionNetwork(this.stateService.network)} transactions in the mempool: fee range, aggregate size, and more. Mempool blocks are updated in real-time as the network receives new transactions.`);
                mempoolBlocks[this.mempoolBlockIndex].isStack = mempoolBlocks[this.mempoolBlockIndex].blockVSize > this.stateService.blockVSize;
                return mempoolBlocks[this.mempoolBlockIndex];
              })
            );
        }),
        tap(() => {
          this.stateService.markBlock$.next({ mempoolBlockIndex: this.mempoolBlockIndex });
        })
      );

    this.mempoolBlockTransactions$ = this.stateService.liveMempoolBlockTransactions$.pipe(map(txMap => Object.values(txMap)));

    this.network$ = this.stateService.networkChanged$;
  }

  ngOnDestroy(): void {
    this.stateService.markBlock$.next({});
  }

  getOrdinal(mempoolBlock: MempoolBlock): string {
    const blocksInBlock = Math.ceil(mempoolBlock.blockVSize / this.stateService.blockVSize);
    if (this.mempoolBlockIndex === 0) {
      return $localize`:@@bdf0e930eb22431140a2eaeacd809cc5f8ebd38c:Next Block`;
    } else if (this.mempoolBlockIndex === this.stateService.env.KEEP_BLOCKS_AMOUNT - 1 && blocksInBlock > 1) {
      return $localize`:@@mempool-block.stack.of.blocks:Stack of ${blocksInBlock}:INTERPOLATION: mempool blocks`;
    } else {
      return $localize`:@@mempool-block.block.no:Mempool block ${this.mempoolBlockIndex + 1}:INTERPOLATION:`;
    }
  }

  setTxPreview(event: TransactionStripped | void): void {
    this.previewTx = event;
  }
}

function detectWebGL() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  return (gl && gl instanceof WebGLRenderingContext);
}
