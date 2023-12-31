# v0.0.4 – Parsing everything

This version finally brings support for all types of inscriptions and features to Ordpool:

* Inscriptions on inputs after the first
* Batch inscriptions via pointers, see pointer docs: https://docs.ordinals.com/inscriptions/pointer.html)
* Parent inscriptions, see provenance docs: https://docs.ordinals.com/inscriptions/provenance.html
* Metadata, see metadata docs: https://docs.ordinals.com/inscriptions/metadata.html
* Metaprotocol
* Brotli content-encoding

**More Features:**

* CSS, JavaScript, and JSON are now formatted and displayed with Syntax-Highlighting

´
**Bugfixes:**

- Parser is not aware of batch inscriptions, see [#2](https://github.com/haushoppe/ordpool/issues/2)


# v0.0.3 – ordpool-parser

**New Feature:**

We've extracted the Inscription parser to a separate repository! 
Now it's your turn! Fork it and add support for Bitcoin Stamps, Atomicals or any other Metaprotocol.
Can't wait to see what you come up with! 🚀

More at: 
* https://github.com/haushoppe/ordpool-parser
* https://www.npmjs.com/package/ordpool-parser

**Bugfixes:**

- Fixes broken Unicode encoding, see [#5](https://github.com/haushoppe/ordpool/issues/5)


# v0.0.2 – "Inscription Accelerator" 🚀 

![Screenshot](https://github.com/haushoppe/ordpool/assets/108269257/5a6179cd-e835-414c-b4a8-4167a14ae85c)

Announcement: https://twitter.com/HausHoppe/status/1732070762972868920

**New Feature:**

We are proud to present the 'Inscription Accelerator'! 🚀  ([PR #6](https://github.com/haushoppe/ordpool/pull/6))

Is your inscription stuck in the mempool and you don't want to wait any longer?
We can help you to create a high-priority follow-up transaction that will boost this inscription.
Made in partnership with our friends at OrdinalsBot.

**Bugfixes:**

- Fixes broken caching of existing blocks, see [#1](https://github.com/haushoppe/ordpool/issues/1)

**Known Issues:**

- Right now, the Parser is not aware of batch inscriptions, see [#2](https://github.com/haushoppe/ordpool/issues/2)


<br>

# v0.0.1 – Initial Release: "Amsterdam"

![mempool-space-preview](https://github.com/haushoppe/ordpool/assets/108269257/f15ee074-72ad-4cbd-acad-cb93931a5258)
The very first public version that was released right before Inscribing Amsterdam!

Announcement: https://twitter.com/HausHoppe/status/1712793358769242288