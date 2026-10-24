# ISPark GenOffice-inspired presentation pipeline

This is an original adapter/spec validation layer inspired by GenOffice's publicly documented **style → outline → page → build → render → audit** process, not a copy of GenOffice internals.

Source: https://github.com/genspark-ai/genoffice/blob/main/packages/pipelines/src/slides/guides/design.md (Apache-2.0 repo)

## Check JDC deck specs

```bash
node presentation/pipeline/check.mjs presentation/decks/jdc
```

## Optional local GenOffice workflow

Install and configure a compatible GenOffice CLI independently. Its page spec grammar may differ from the ISPark intermediate JSON. **A converter is required** before `genoffice create --spec` works.

```bash
genoffice capabilities --json
genoffice guide slides spec
# Convert ISPark page specifications to GenOffice page JSON before the next commands:
genoffice slides check deck/outline.json --json
genoffice slides check deck/pages/01.json --json
genoffice create --type pptx --spec deck/pages --outline deck/outline.json --out deck/deck.pptx --json
genoffice slides render deck/deck.pptx
genoffice slides audit deck/deck.pptx
```

Do not run the build commands directly on the sample ISPark JSON: these samples are *intermediate content specs*, not GenOffice page geometry specs.

## Current completeness

- [x] Style sheet, outline, one page per file
- [x] Deterministic content consistency, layout and claim checking
- [ ] GenOffice spec converter
- [ ] Editable PPTX generation
- [ ] Visual rendering audit and screenshot comparisons
- [ ] Official logo and licensed stone-wall photograph assets

Keep existing Vue components and npm exports unchanged until the pipeline is production-ready.
