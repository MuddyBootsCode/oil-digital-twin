const locations = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Fusion 1",
        type: "lease",
      },
      geometry: {
        coordinates: [
          [
            [-102.20454957161478, 32.045379363326575],
            [-102.1881068703019, 32.05048079729259],
            [-102.19214518069771, 32.064280778918345],
            [-102.22578892849019, 32.05649343544826],
            [-102.21635492689526, 32.02834923029896],
            [-102.2004482289995, 32.03224633456608],
            [-102.20454957161478, 32.045379363326575],
          ],
        ],
        type: "Polygon",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2",
        type: "lease",
      },
      geometry: {
        coordinates: [
          [
            [-102.22580141108396, 32.056501043687405],
            [-102.23006716639014, 32.07079145563921],
            [-102.28154170519092, 32.05858547045912],
            [-102.27445083330923, 32.046389300893],
            [-102.23818249330229, 32.02855617223052],
            [-102.21861081308157, 32.034372078207625],
            [-102.22580141108396, 32.056501043687405],
          ],
        ],
        type: "Polygon",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-A",
        type: "battery",
        lease: "Fusion 3",
      },
      geometry: {
        coordinates: [-102.22181479494955, 32.078617184702594],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-A",
        type: "battery",
        lease: "Fusion 1",
      },
      geometry: {
        coordinates: [-102.21008577401646, 32.04272044854714],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3",
        type: "lease",
      },
      geometry: {
        coordinates: [
          [
            [-102.2346539496927, 32.08479456654511],
            [-102.22542348869017, 32.056794556683386],
            [-102.19196541966264, 32.064590388881044],
            [-102.20201647370956, 32.09286155299755],
            [-102.2346539496927, 32.08479456654511],
          ],
        ],
        type: "Polygon",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-A",
        type: "battery",
        lease: "Fusion 2",
      },
      geometry: {
        coordinates: [-102.26054822547297, 32.05594601947193],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-3A",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.21684644084215, 32.04242044152062],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-4A",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.21517831040806, 32.03875956340865],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-5A",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.21242689915562, 32.041478409901046],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-6A",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.20807734851935, 32.04459337957361],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-7A",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.20500752457963, 32.04348227984934],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-8A",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.20632758347223, 32.04087541628208],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-9A",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.20909895271672, 32.039091635920855],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-10A",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.20759728965353, 32.037627820676974],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-12A",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.20858351773118, 32.035081740158034],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-13A",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.20217334580188, 32.0336729031292],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-14A",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.20517024183653, 32.034023387799195],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-15A",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.20679621912822, 32.03190933634143],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-16A",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.21029401445551, 32.032170443484375],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-17A",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.21311662945723, 32.03571570367558],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-18A",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.21332125910196, 32.032608923885405],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-19A",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.21675696373808, 32.033505163192515],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-20",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-A",
      },
      geometry: {
        coordinates: [-102.21508413457373, 32.03048445679096],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-B",
        type: "battery",
        lease: "Fusion 1",
      },
      geometry: {
        coordinates: [-102.21488365295741, 32.05760199921163],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-1B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.22072767437945, 32.044347281933355],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-2B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.22054588455643, 32.04628628356595],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-3B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.22246347579352, 32.051459609708374],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-4B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.2191861095446, 32.05626782050521],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-5B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.21814541868076, 32.052354285371436],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-6B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.21105277520198, 32.05227734775616],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-7B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.21196651605631, 32.05577556498427],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-8B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.20900027580166, 32.054499451734856],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-9B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.20846469191824, 32.05091144053141],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-10B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.20692160320462, 32.047554398428886],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-11B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.20731171070398, 32.0599143708877],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-12B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.2045205195469, 32.058077204408804],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-13B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.19968100665375, 32.06063029492812],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-14B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.19665727575362, 32.06251365346017],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-15B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.19663945684614, 32.059501254301296],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-16B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.1972503604109, 32.05646493496158],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-17B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.20102535324602, 32.05712943080488],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-18B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.19982850749156, 32.05436339467467],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-19B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.20417386516415, 32.05470401345933],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-20B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.20294421295449, 32.05176908887779],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-21B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.20550908340716, 32.0527344769295],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 1-22B",
        type: "oilWell",
        lease: "Fusion 1",
        battery: "Fusion 1-B",
      },
      geometry: {
        coordinates: [-102.20462313140406, 32.049454860087124],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        type: "battery",
        name: "Fusion 3-B",
        lease: "Fusion 3",
      },
      geometry: {
        coordinates: [-102.2213937931464, 32.065527047833186],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-1A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.20296000658352, 32.09086464971419],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-2A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.20244638337671, 32.088724800479184],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-3A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.20154834756622, 32.08617828966639],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-4A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.20088244900734, 32.084484440403216],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-5A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.20011339100883, 32.08224536963907],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-6A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.19956034881459, 32.079388351102764],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-7A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.20843368623514, 32.08857278453884],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-8A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.20711427087036, 32.08447798964451],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-9A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.20438256286747, 32.082651447346066],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-10A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.20367496615856, 32.080136350227235],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-11A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.20500703850534, 32.077666137713436],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-12A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.2082851031607, 32.078402120107114],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-13A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.20977367267112, 32.08573221664163],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-14A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.21036057892265, 32.0807761917233],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-15A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.21314001944356, 32.07872506182211],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-16A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.21413463271361, 32.08235046854911],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-17A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.21512069537748, 32.08577150367722],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-18A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.21998503764135, 32.086082938045564],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-19A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.22109691069365, 32.08404733379206],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-20A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.2266038611129, 32.085325295029676],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-21A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.2332102125999, 32.08349125710714],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-22A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.23138620705781, 32.07964408493051],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-23A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.23030615964865, 32.07599356713165],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-24A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.22632276771718, 32.076997757923735],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-25A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.22531431883422, 32.07342616756597],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-26A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.22040613239116, 32.074331915443366],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-27A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.21998643932459, 32.08052865919325],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-28A",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-A",
      },
      geometry: {
        coordinates: [-102.2187628297265, 32.077112623977754],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-1B",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-B",
      },
      geometry: {
        coordinates: [-102.21548334590368, 32.072813340164586],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-2B",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-B",
      },
      geometry: {
        coordinates: [-102.21496236648346, 32.071158055367036],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-3B",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-B",
      },
      geometry: {
        coordinates: [-102.21430808641074, 32.06938058204821],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-4B",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-B",
      },
      geometry: {
        coordinates: [-102.21384635561837, 32.0676142615399],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-5B",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-B",
      },
      geometry: {
        coordinates: [-102.21319432921042, 32.065831998667676],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-6B",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-B",
      },
      geometry: {
        coordinates: [-102.21271867409679, 32.06402357339357],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-7B",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-B",
      },
      geometry: {
        coordinates: [-102.21204807145938, 32.06228528127275],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-8B",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-B",
      },
      geometry: {
        coordinates: [-102.21153855433927, 32.06042004323926],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-9B",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-B",
      },
      geometry: {
        coordinates: [-102.22769898273576, 32.07029253993389],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-10B",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-B",
      },
      geometry: {
        coordinates: [-102.2272437612483, 32.067919728332015],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-11B",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-B",
      },
      geometry: {
        coordinates: [-102.22671247240345, 32.06619002044691],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-12B",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-B",
      },
      geometry: {
        coordinates: [-102.22608004283198, 32.06445472298735],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-13B",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-B",
      },
      geometry: {
        coordinates: [-102.22561962370459, 32.06255281466494],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-14B",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-B",
      },
      geometry: {
        coordinates: [-102.22494817186573, 32.06084872285686],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-15B",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-B",
      },
      geometry: {
        coordinates: [-102.224417652319, 32.059158504630815],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 3-16B",
        type: "oilWell",
        lease: "Fusion 3",
        battery: "Fusion 3-B",
      },
      geometry: {
        coordinates: [-102.22383292030933, 32.05792714321423],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-1A",
        type: "oilWell",
        lease: "Fusion 2",
        battery: "Fusion 2-A",
      },
      geometry: {
        coordinates: [-102.27787824067084, 32.05826987213145],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-2A",
        type: "oilWell",
        lease: "Fusion 2",
        battery: "Fusion 2-A",
      },
      geometry: {
        coordinates: [-102.27736118688466, 32.05651702495072],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-3A",
        type: "oilWell",
        lease: "Fusion 2",
        battery: "Fusion 2-A",
      },
      geometry: {
        coordinates: [-102.27678668267785, 32.05495891037562],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-4A",
        type: "oilWell",
        lease: "Fusion 2",
        battery: "Fusion 2-A",
      },
      geometry: {
        coordinates: [-102.27621217847151, 32.05320599976173],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-5A",
        type: "oilWell",
        lease: "Fusion 2",
        battery: "Fusion 2-A",
      },
      geometry: {
        coordinates: [-102.2756376742647, 32.05174521526533],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-6A",
        type: "oilWell",
        lease: "Fusion 2",
        battery: "Fusion 2-A",
      },
      geometry: {
        coordinates: [-102.27535042216105, 32.05038179536258],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-7A",
        type: "oilWell",
        lease: "Fusion 2",
        battery: "Fusion 2-A",
      },
      geometry: {
        coordinates: [-102.2743163145892, 32.048093152002124],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-8A",
        type: "oilWell",
        lease: "Fusion 2",
        battery: "Fusion 2-A",
      },
      geometry: {
        coordinates: [-102.27391416164426, 32.04643750197941],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-9A",
        type: "oilWell",
        lease: "Fusion 2",
        battery: "Fusion 2-A",
      },
      geometry: {
        coordinates: [-102.27184594650005, 32.05841594121421],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-10A",
        type: "oilWell",
        lease: "Fusion 2",
        battery: "Fusion 2-A",
      },
      geometry: {
        coordinates: [-102.26943302883151, 32.056322262080016],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-11A",
        type: "oilWell",
        lease: "Fusion 2",
        battery: "Fusion 2-A",
      },
      geometry: {
        coordinates: [-102.27017988430023, 32.05340076926585],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-12A",
        type: "oilWell",
        lease: "Fusion 2",
        battery: "Fusion 2-A",
      },
      geometry: {
        coordinates: [-102.26805421873536, 32.051501748915086],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-13A",
        type: "oilWell",
        lease: "Fusion 2",
        battery: "Fusion 2-A",
      },
      geometry: {
        coordinates: [-102.26765206579044, 32.049553994796085],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-14A",
        type: "oilWell",
        lease: "Fusion 2",
        battery: "Fusion 2-A",
      },
      geometry: {
        coordinates: [-102.2702947851415, 32.04794706643989],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-15A",
        type: "oilWell",
        lease: "Fusion 2",
        battery: "Fusion 2-A",
      },
      geometry: {
        coordinates: [-102.26730736326665, 32.04556096925495],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Fusion 2-16A",
        type: "oilWell",
        lease: "Fusion 2",
        battery: "Fusion 2-A",
      },
      geometry: {
        coordinates: [-102.2666754086392, 32.043807878622175],
        type: "Point",
      },
    },

    {
      type: "Feature",
      properties: {
        type: "SWD",
        lease: "Fusion 2",
        name: "Fusion 2 SWD",
      },
      geometry: {
        coordinates: [-102.25456327327733, 32.050596127994254],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        type: "pipelineStation",
        name: "Centurion",
        pipeLineName: "Centurion Pipeline",
      },
      geometry: {
        coordinates: [-102.2256084934501, 32.10246235569156],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {
        type: "pipeline",
        name: "Centurion Pipeline",
      },
      geometry: {
        coordinates: [
          [-102.22580307326334, 32.10276166877891],
          [-102.02403162042603, 32.01114995096866],
        ],
        type: "LineString",
      },
    },
    {
      type: "Feature",
      properties: {
        type: "oilStorage",
      },
      geometry: {
        coordinates: [-102.02391702276702, 32.0111826640225],
        type: "Point",
      },
    },
  ],
};

module.exports = locations;
