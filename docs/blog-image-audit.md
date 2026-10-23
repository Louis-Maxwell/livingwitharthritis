# Blog image audit (October 2026)

Every blog cover and inline image was checked against the post topic. Unrelated photos were removed. Replacements use only images already in `public/openverse/`. No photos were generated, and no photos of identifiable real people were added.

- Covers checked: 601. Kept: 303. Removed: 278. Replaced: 20.
- Inline body images removed: 46.
- A removed cover is stored as `"cover": ""`. Blog cards show the branded `lwa-blog-cover-placeholder.webp` card (no photo), the post page shows no hero photo, and share previews use the placeholder card.
- To add a new photo, put a topic-relevant, openly licensed `.webp` in `public/openverse/`, set `cover` in the post JSON, and run `bun scripts/generate-blog-catalog.ts`.

## Covers removed or replaced

| Post | Old image | Action | Reason | New image |
|---|---|---|---|---|
| activity-diary-arthritis-frailty-uk | cover-0175-a-wooden-bridge-at-the-beginning-of-the-kbal-.webp | removed | Unrelated subject ("a-wooden-bridge-at-the-beginning-of-the-kbal-") | — |
| advance-care-planning-arthritis-frailty-uk | cover-0479-20171027-ams-lsc-0725.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| alcohol-arthritis-uk-guidance | cover-0094-walk.webp | removed | Activity photo ("walk") unrelated to this non-exercise topic | — |
| anaesthetic-risk-arthritis-frailty-uk | cover-0450-william-cooper.webp | removed | Unrelated subject ("william-cooper") | — |
| anticholinergic-load-arthritis-frailty-uk | cover-0076-img-7743-jpg.webp | removed | Unrelated subject ("img-7743-jpg") | — |
| anxiety-arthritis-uk-guide | cover-0156-painted-for-prayer-2.webp | removed | Unrelated subject ("painted-for-prayer-2") | — |
| appeal-rejected-pip-arthritis | cover-0178-p1223956-bw-jpg.webp | removed | Unrelated subject ("p1223956-bw-jpg") | — |
| apprenticeships-and-arthritis-a-realistic-look | cover-0171-a-corner-of-chinatown.webp | removed | Unrelated subject ("a-corner-of-chinatown") | — |
| arthritis-and-alcohol-uk | cover-0471-support-for-japan.webp | removed | Unrelated subject ("support-for-japan") | — |
| arthritis-and-pets-uk | cover-0458-20171027-ams-lsc-0124.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| arthritis-and-pregnancy-uk | cover-0297-roy-wilkins-park-td-2019-01-13-026-outdoor-fi.webp | removed | Unrelated subject ("roy-wilkins-park-td-2019-01-13-026-outdoor-fi") | — |
| arthritis-and-sleep-problems | cover-0475-boroma.webp | removed | Unrelated subject ("boroma") | — |
| arthritis-hows-life-living-with-arthritis | cover-0484-seaweed-cucumber-sunomono.webp | removed | Food photo ("seaweed-cucumber-sunomono") on a non-diet post | — |
| arthritis-in-older-adults | cover-0200-fallen-blossom.webp | removed | Unrelated subject ("fallen-blossom") | — |
| arthritis-in-young-adults | cover-0311-dorchester-senior-center.webp | removed | Photo subject ("dorchester-senior-center") does not match the post topic | — |
| arthritis-pain-management | cover-0143-02141239.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| arthritis-pain-relief-natural | cover-0423-learning-to-swim.webp | removed | Swimming/pool photo ("learning-to-swim") on a post that is not about swimming or hydrotherapy | — |
| arthritis-physiotherapy-nhs-waiting-list | cover-0129-neighbor.webp | removed | Unrelated subject ("neighbor") | — |
| arthritis-relationships-honest-conversations | cover-0196-water-aerobics.webp | removed | Swimming/pool photo ("water-aerobics") on a post that is not about swimming or hydrotherapy | — |
| arthritis-support-groups-glasgow | cover-0195-a-selfie-on-the-walk-to-the-boat-station-cour.webp | removed | Photo subject ("a-selfie-on-the-walk-to-the-boat-station-cour") does not match the post topic | — |
| arthritis-support-groups-manchester | cover-0426-learning-to-swim.webp | removed | Swimming/pool photo ("learning-to-swim") on a post that is not about swimming or hydrotherapy | — |
| arthritis-support-groups-wales | cover-0061-grand-canyon-trail-of-time-dedication-0101013.webp | removed | Photo subject ("grand-canyon-trail-of-time-dedication-0101013") does not match the post topic | — |
| arthritis-support-refugees-diverse-communities | cover-0341-060415couples.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| arthritis-treatment-hub | cover-0368-water-exercise-class-a-reflection.webp | removed | Swimming/pool photo ("water-exercise-class-a-reflection") on a post that is not about swimming or hydrotherapy | — |
| assistive-devices-arthritis-uk | cover-0414-slippery-rocks-and-no-hand-holds-was-what-spo.webp | removed | Photo subject ("slippery-rocks-and-no-hand-holds-was-what-spo") does not match the post topic | — |
| attendance-allowance-arthritis-frailty-uk | cover-0398-cancun-diving-c-58-wreck.webp | removed | Unrelated subject ("cancun-diving-c-58-wreck") | — |
| balance-painful-feet-frailty-arthritis-uk | cover-0080-buenos-aires-botanical-garden.webp | removed | Unrelated subject ("buenos-aires-botanical-garden") | — |
| bed-exercises-hospital-arthritis-frailty-uk | cover-0315-emily-malugen.webp | removed | Unrelated subject ("emily-malugen") | — |
| bed-lever-arthritis-frailty-uk | cover-0127-contrast.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| bedtime-routine-arthritis-relief | cover-0158-bureau-chief-gordon-cole.webp | removed | Unrelated subject ("bureau-chief-gordon-cole") | — |
| bereavement-arthritis-frailty-living-alone-uk | cover-0177-tipped-kerbstone-outside-82a-white-hart-lane.webp | removed | Unrelated subject ("tipped-kerbstone-outside-82a-white-hart-lane") | — |
| best-plantar-fasciitis-shoes-women-uk | cover-0210-ballet-and-macs-at-pleasantview-care-facility.webp | removed | Photo subject ("ballet-and-macs-at-pleasantview-care-facility") does not match the post topic | — |
| best-sleep-positions-joint-pain | cover-0484-20171027-ams-lsc-1278.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| best-supplement-for-knee-joint | cover-0174-looking-through-a-view-finder-can-be-hazardou.webp | removed | Unrelated subject ("looking-through-a-view-finder-can-be-hazardou") | — |
| best-supplements-arthritis-uk | cover-0338-faith-in-humanity.webp | removed | Unrelated subject ("faith-in-humanity") | — |
| best-supplements-joint-pain | cover-0332-holding-hands-10-10-10.webp | removed | Photo subject ("holding-hands-10-10-10") does not match the post topic | — |
| big-toe-osteoarthritis-frailty-shoes-balance-uk | cover-0153-apr-28-2014-camino-de-santiago-tour-frescotou.webp | removed | Unrelated subject ("apr-28-2014-camino-de-santiago-tour-frescotou") | — |
| biologic-side-effects-infections-injections-and-monitoring | cover-0302-roy-wilkins-park-td-2019-01-13-024-outdoor-fi.webp | removed | Unrelated subject ("roy-wilkins-park-td-2019-01-13-024-outdoor-fi") | — |
| blood-test-transport-arthritis-frailty-uk | cover-0333-makes-a-wonderful-park.webp | removed | Unrelated subject ("makes-a-wonderful-park") | — |
| blue-badge-arthritis-scotland | cover-0282-fitness-programming-greenville-aquatics.webp | removed | Swimming/pool photo ("fitness-programming-greenville-aquatics") on a post that is not about swimming or hydrotherapy | — |
| bone-clinic-arthritis-frailty-uk | cover-0382-the-dip-iii-la-baignade-iii.webp | removed | Swimming/pool photo ("the-dip-iii-la-baignade-iii") on a post that is not about swimming or hydrotherapy | — |
| bone-protection-steroids-arthritis-frailty-uk | cover-0088-the-three-amigos.webp | removed | Unrelated subject ("the-three-amigos") | — |
| building-strength-resilience-exercise-frailty-prevention | cover-0320-fitness-programming-greenville-aquatics.webp | removed | Swimming/pool photo ("fitness-programming-greenville-aquatics") on a post that is not about swimming or hydrotherapy | — |
| caregiver-burnout-in-arthritis-families-spot-it-early | cover-0172-andes-in-bloom.webp | removed | Unrelated subject ("andes-in-bloom") | — |
| carer-burnout-arthritis-frailty-uk | cover-0062-elegance.webp | removed | Unrelated subject ("elegance") | — |
| carers-assessment-arthritis-frailty-uk | cover-0164-christmas.webp | removed | Unrelated subject ("christmas") | — |
| cbt-chronic-pain-arthritis | cover-0114-keep-in-mind-the-many-beings-who-are-sufferin.webp | removed | Unrelated subject ("keep-in-mind-the-many-beings-who-are-sufferin") | — |
| chair-based-exercise-ra-frailty-uk | cover-0318-fitness-programming-greenville-aquatics.webp | removed | Swimming/pool photo ("fitness-programming-greenville-aquatics") on a post that is not about swimming or hydrotherapy | — |
| chest-infection-arthritis-frailty-uk | cover-0343-hudson-river-park-views.webp | removed | Unrelated subject ("hudson-river-park-views") | — |
| cognition-arthritis-frailty-remembering-tablets-uk | cover-0410-14-fox-mountain-trailhead-parking-for-spring-.webp | removed | Unrelated subject ("14-fox-mountain-trailhead-parking-for-spring-") | — |
| cold-weather-arthritis-uk-winter | cover-0190-barriers-are-down.webp | removed | Unrelated subject ("barriers-are-down") | — |
| community-alarm-arthritis-frailty-uk | cover-0319-fitness-programming-greenville-aquatics.webp | removed | Swimming/pool photo ("fitness-programming-greenville-aquatics") on a post that is not about swimming or hydrotherapy | — |
| community-ot-waiting-arthritis-frailty-uk | cover-0452-jelly-donuts.webp | removed | Food photo ("jelly-donuts") on a non-diet post | — |
| community-physio-wait-frail-arthritis-uk | cover-0381-cold-steel-triathlon.webp | removed | Unrelated subject ("cold-steel-triathlon") | — |
| community-strength-classes-frail-oa-uk | cover-0317-fitness-programming-greenville-aquatics.webp | removed | Swimming/pool photo ("fitness-programming-greenville-aquatics") on a post that is not about swimming or hydrotherapy | — |
| community-transport-arthritis-frailty-uk | cover-0110-hombre-con-galabiya-giza-egipto.webp | removed | Unrelated subject ("hombre-con-galabiya-giza-egipto") | — |
| confidence-after-fall-arthritis-frailty-uk | cover-0428-learning-to-swim.webp | removed | Swimming/pool photo ("learning-to-swim") on a post that is not about swimming or hydrotherapy | — |
| constipation-pain-medicines-frailty-arthritis-uk | cover-0170-1699-cidade-de-lugo.webp | removed | Unrelated subject ("1699-cidade-de-lugo") | — |
| copd-arthritis-frailty-breathlessness-uk | cover-0458-harm-nia-swimming-pool-bicycles-in-gy-mr-pest-3ae74262.webp | removed | Swimming/pool photo ("harm-nia-swimming-pool-bicycles-in-gy-mr-pest") on a post that is not about swimming or hydrotherapy | — |
| core-strengthening-spinal-arthritis | cover-0428-20120628-oc-lsc-0461.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| deconditioning-after-arthritis-flare-uk | cover-0420-learning-to-swim.webp | removed | Swimming/pool photo ("learning-to-swim") on a post that is not about swimming or hydrotherapy | — |
| delirium-hospital-arthritis-frailty-uk | cover-0309-bethany.webp | removed | Unrelated subject ("bethany") | — |
| dental-care-arthritis-frailty-hands-uk | cover-0487-20171027-ams-lsc-0268.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| depression-arthritis-when-to-seek-help | cover-0133-xoka3965bs.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| desk-setup-arthritis-uk-workers | cover-0079-walking-ii-la-marche-ii.webp | removed | Activity photo ("walking-ii-la-marche-ii") unrelated to this non-exercise topic | — |
| diabetes-arthritis-frailty-feet-uk | cover-0456-support-for-japan.webp | removed | Unrelated subject ("support-for-japan") | — |
| direct-payments-arthritis-frailty-uk | cover-0085-untitled.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| disability-rights-workplace-arthritis | cover-0425-learning-to-swim.webp | removed | Swimming/pool photo ("learning-to-swim") on a post that is not about swimming or hydrotherapy | — |
| discharge-planning-arthritis-frailty-uk | cover-0384-vale-youth-art-project-094.webp | removed | Unrelated subject ("vale-youth-art-project-094") | — |
| dmards-explained-how-methotrexate-slows-rheumatoid-arthritis | cover-0394-cancun-manchones.webp | removed | Unrelated subject ("cancun-manchones") | — |
| early-arthritis-intervention-uk | cover-0139-part-is-missing.webp | removed | Unrelated subject ("part-is-missing") | — |
| early-signs-gout-big-toe | cover-0402-swimming-for-the-elderly.webp | removed | Swimming/pool photo ("swimming-for-the-elderly") on a post that is not about swimming or hydrotherapy | — |
| elbow-osteoarthritis-frailty-kitchen-tasks-uk | cover-0478-mixed-beans-sprouted.webp | removed | Food photo ("mixed-beans-sprouted") on a non-diet post | — |
| end-of-life-joint-pain-frailty-uk | cover-0329-shipping-containers-and-runes.webp | removed | Unrelated subject ("shipping-containers-and-runes") | — |
| exam-adjustments-for-students-with-arthritis | cover-0399-confident-birds-feeding-from-hand.webp | removed | Photo subject ("confident-birds-feeding-from-hand") does not match the post topic | — |
| expert-brief-activity-safety-knee-arthritis | cover-0486-20171027-ams-lsc-0689.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| expert-brief-exercise-order-pain-relief | cover-0112-013942-haymarket-hotel-percy-street-1964.webp | removed | Unrelated subject ("013942-haymarket-hotel-percy-street-1964") | — |
| expert-brief-frozen-shoulder-vs-ra | cover-0126-one-giant-visit-for-balad.webp | removed | Unrelated subject ("one-giant-visit-for-balad") | — |
| expert-qa-are-steroid-tapers-always-necessary | cover-0488-20171027-ams-lsc-0273.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| expert-qa-exercising-through-a-flare-up | cover-0376-senior-swimmer-3-months-later.webp | removed | Swimming/pool photo ("senior-swimmer-3-months-later") on a post that is not about swimming or hydrotherapy | — |
| expert-qa-how-to-ask-for-help-without-feeling-guilty | cover-0198-dil-chora-hospital-dire-dawa-ethiopia-2010.webp | removed | Unrelated subject ("dil-chora-hospital-dire-dawa-ethiopia-2010") | — |
| expert-qa-how-to-talk-to-your-gp-about-medication-worries | cover-0301-yes-teacher-varanasi.webp | removed | Unrelated subject ("yes-teacher-varanasi") | — |
| expert-qa-is-it-too-soon-for-joint-replacement | cover-0410-100328-f-7713a-031.webp | removed | Unrelated subject ("100328-f-7713a-031") | — |
| expert-qa-is-it-worth-paying-for-a-second-opinion | cover-0155-broken-paving-park-view-road.webp | removed | Unrelated subject ("broken-paving-park-view-road") | — |
| expert-qa-returning-to-work-after-a-bad-flare | cover-0397-friendly-staff-of-the-kopi-luwak-centre-hope-.webp | removed | Unrelated subject ("friendly-staff-of-the-kopi-luwak-centre-hope-") | — |
| expert-qa-should-you-start-dmards-at-diagnosis | cover-0485-20171027-ams-lsc-0317.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| expert-qa-why-did-my-arthritis-come-back | cover-0372-351ad46d-16e2-4427-997c-2b0e1957b0d7.webp | removed | Unrelated subject ("351ad46d-16e2-4427-997c-2b0e1957b0d7") | — |
| expert-qa-will-my-children-inherit-my-arthritis | cover-0299-good-morning-sf.webp | removed | Unrelated subject ("good-morning-sf") | — |
| explain-juvenile-arthritis-school-teachers | cover-0415-portrait-of-a-plump-elderly-man-sitting-facin-b46402ee.webp | removed | Photo subject ("portrait-of-a-plump-elderly-man-sitting-facin") does not match the post topic | — |
| extra-care-housing-arthritis-frailty-uk | cover-0411-cold-steel-triathlon.webp | removed | Unrelated subject ("cold-steel-triathlon") | — |
| eye-clinic-day-arthritis-frailty-uk | cover-0388-jennifer.webp | removed | Unrelated subject ("jennifer") | — |
| falls-response-service-arthritis-uk | cover-0409-think-outside-photo-contest-first-landing-sta.webp | removed | Unrelated subject ("think-outside-photo-contest-first-landing-sta") | — |
| family-meetings-arthritis-frailty-uk | cover-0377-stinky-hotel-in-cancun-fiesta-americana-villa.webp | removed | Unrelated subject ("stinky-hotel-in-cancun-fiesta-americana-villa") | — |
| fear-of-falling-hip-oa-frailty-uk | cover-0176-c-mon-let-s-go.webp | removed | Unrelated subject ("c-mon-let-s-go") | — |
| flare-management-pain-spikes | cover-0424-learning-to-swim.webp | removed | Swimming/pool photo ("learning-to-swim") on a post that is not about swimming or hydrotherapy | — |
| flare-versus-frailty-arthritis-uk | cover-0462-detail-of-lobby-mural.webp | removed | Unrelated subject ("detail-of-lobby-mural") | — |
| flexible-working-arthritis-pacing | cover-0123-max-and-erin-photobomb.webp | removed | Unrelated subject ("max-and-erin-photobomb") | — |
| flu-jab-arthritis-frailty-uk | cover-0162-ben-the-greyhound.webp | removed | Unrelated subject ("ben-the-greyhound") | — |
| footwear-indoor-slippers-frailty-arthritis-uk | cover-0091-who-s-that-in-the-bushes.webp | removed | Unrelated subject ("who-s-that-in-the-bushes") | — |
| frailty-older-people-arthritis-wales-uk | cover-0326-the-art-of-cursive.webp | removed | Unrelated subject ("the-art-of-cursive") | — |
| free-arthritis-support-northern-ireland | cover-0468-frozen-yogurt-cups-sunshine-cups.webp | removed | Food photo ("frozen-yogurt-cups-sunshine-cups") on a non-diet post | — |
| fried-frailty-phenotype-painful-joints-uk | cover-0457-silly-mom-silly-dad.webp | removed | Unrelated subject ("silly-mom-silly-dad") | — |
| gabapentinoids-unsteadiness-arthritis-frailty-uk | cover-0463-while-our-pilgrims-walked-with-another-guide-.webp | removed | Unrelated subject ("while-our-pilgrims-walked-with-another-guide-") | — |
| gene-therapy-and-arthritis-where-are-we-in-2026 | cover-0118-twigged-chesnut-road-1.webp | removed | Unrelated subject ("twigged-chesnut-road-1") | — |
| generalised-oa-frailty-whole-body-day-uk | cover-0131-pondering-man-and-laughing-lady-siena-italy.webp | removed | Unrelated subject ("pondering-man-and-laughing-lady-siena-italy") | — |
| geriatric-clinic-plus-arthritis-uk | cover-0473-grandfather-reading.webp | removed | Unrelated subject ("grandfather-reading") | — |
| glucosamine-vs-collagen | cover-0429-learning-to-swim.webp | removed | Swimming/pool photo ("learning-to-swim") on a post that is not about swimming or hydrotherapy | — |
| glute-bridges-hip-osteoarthritis-guide | cover-0465-support-for-japan.webp | removed | Unrelated subject ("support-for-japan") | — |
| gout-medication-uk | cover-0180-lady-herbert-s-homes-coventry.webp | removed | Unrelated subject ("lady-herbert-s-homes-coventry") | — |
| gp-home-visit-arthritis-frailty-uk | cover-0157-this-lady-shows-off-her-wares.webp | removed | Unrelated subject ("this-lady-shows-off-her-wares") | — |
| grab-rails-arthritis-frailty-home-uk | cover-0470-fresh-blueberries.webp | removed | Unrelated subject ("fresh-blueberries") | — |
| grip-strength-exercises-hand-oa | cover-0456-frozen-yogurt-cups-sunshine-cups.webp | removed | Food photo ("frozen-yogurt-cups-sunshine-cups") on a non-diet post | — |
| gut-joint-connection-microbiome-arthritis | cover-0458-dont-worry-about-a-thing-bob-marley.webp | removed | Unrelated subject ("dont-worry-about-a-thing-bob-marley") | — |
| hand-exercises-for-arthritis | cover-0455-the-coopers.webp | removed | Unrelated subject ("the-coopers") | — |
| hand-osteoarthritis-frailty-dressing-cooking-uk | cover-0349-out-on-the-town.webp | removed | Unrelated subject ("out-on-the-town") | — |
| heat-packs-frail-arthritis-uk | cover-0420-the-great-hospital-norwich-the-swan-pit.webp | removed | Unrelated subject ("the-great-hospital-norwich-the-swan-pit") | — |
| high-rise-flat-arthritis-frailty-lifts-uk | cover-0481-20171027-ams-lsc-0757.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| hip-and-knee-oa-frailty-transfers-uk | cover-0352-d9c9a523-5b84-440f-bf53-e60f260e6d95.webp | removed | Unrelated subject ("d9c9a523-5b84-440f-bf53-e60f260e6d95") | — |
| hip-arthritis-symptoms-uk | cover-0418-om-yoga-mat-bag-6dc653e8.webp | removed | Activity photo ("om-yoga-mat-bag") unrelated to this non-exercise topic | — |
| hip-oa-frailty-bed-mobility-uk | cover-0401-painting-under-a-sakura-tree.webp | removed | Unrelated subject ("painting-under-a-sakura-tree") | — |
| hip-pain-climbing-stairs-causes-relief | cover-0335-everything.webp | removed | Unrelated subject ("everything") | — |
| hip-replacement-arthritis-uk | cover-0284-stretching-exercises.webp | removed | Activity photo ("stretching-exercises") unrelated to this non-exercise topic | — |
| hobbies-arthritis-friendly-uk | cover-0433-fitness-programming-greenville-aquatics.webp | removed | Swimming/pool photo ("fitness-programming-greenville-aquatics") on a post that is not about swimming or hydrotherapy | — |
| hoist-conversations-family-carers-uk | cover-0415-learning-to-swim.webp | removed | Swimming/pool photo ("learning-to-swim") on a post that is not about swimming or hydrotherapy | — |
| holiday-at-home-arthritis-frailty-uk | cover-0422-beijing-china-017.webp | removed | Unrelated subject ("beijing-china-017") | — |
| hospital-appointments-frailty-arthritis-uk | cover-0471-mirepoix-called-also-soffritto.webp | removed | Unrelated subject ("mirepoix-called-also-soffritto") | — |
| hospital-deconditioning-arthritis-stay-uk | cover-0414-berkeley-lake-park.webp | removed | Unrelated subject ("berkeley-lake-park") | — |
| hospital-parking-walking-frail-arthritis-uk | cover-0463-b-guinage-of-bruges.webp | removed | Unrelated subject ("b-guinage-of-bruges") | — |
| hospital-stay-arthritis-frailty-what-to-pack-uk | cover-0476-support-for-japan.webp | removed | Unrelated subject ("support-for-japan") | — |
| hotel-rooms-accessibility-arthritis | cover-0469-refugee.webp | removed | Unrelated subject ("refugee") | — |
| inflammatory-arthritis-frailty-flare-week-uk | cover-0140-tashkent-4176rt.webp | removed | Unrelated subject ("tashkent-4176rt") | — |
| inflammatory-arthritis-guide | cover-0422-140930-d-db155-003.webp | removed | Unrelated subject ("140930-d-db155-003") | — |
| intermediate-care-arthritis-frailty-uk | cover-0116-alone-in-the-world.webp | removed | Unrelated subject ("alone-in-the-world") | — |
| jak-inhibitors-the-next-wave-of-ra-treatment | cover-0483-buffalo-wing-bento.webp | removed | Food photo ("buffalo-wing-bento") on a non-diet post | — |
| joint-fusion-vs-replacement-how-surgeons-choose | cover-0474-recipe-for-pumpkin-stuffed-with-everything-go.webp | removed | Unrelated subject ("recipe-for-pumpkin-stuffed-with-everything-go") | — |
| joint-replacement-decision-frailty-uk | cover-0403-chesnut-road-looking-eastward-july-2012-cropp.webp | removed | Unrelated subject ("chesnut-road-looking-eastward-july-2012-cropp") | — |
| joint-replacement-surgery | cover-0416-with-zena-larry-broad-walk-regent-s-park.webp | removed | Activity photo ("with-zena-larry-broad-walk-regent-s-park") unrelated to this non-exercise topic | — |
| juvenile-arthritis-school-support-parents | cover-0065-untitled.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| juvenile-arthritis-uk | cover-0084-completion-of-improvements-at-murray-hill-com.webp | removed | Unrelated subject ("completion-of-improvements-at-murray-hill-com") | — |
| kettle-safety-arthritis-frailty-uk | cover-0106-wwpw-2014-drizzico-6.webp | removed | Unrelated subject ("wwpw-2014-drizzico-6") | — |
| kitchen-adaptations-arthritis-frailty-uk | cover-0441-32e86270-4007-4d1f-8d8a-65d6c40e16f5.webp | removed | Unrelated subject ("32e86270-4007-4d1f-8d8a-65d6c40e16f5") | — |
| knee-arthritis-exercises-uk | cover-0450-frozen-yogurt-cups-sunshine-cups.webp | removed | Food photo ("frozen-yogurt-cups-sunshine-cups") on a non-diet post | — |
| knee-arthroscopy-for-osteoarthritis-helpful-or-hype | cover-0369-stages-of-life.webp | removed | Unrelated subject ("stages-of-life") | — |
| knee-oa-frailty-outdoor-pavements-uk | cover-0395-img-8513.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| knee-oa-frailty-rising-from-low-sofa-uk | cover-0148-children-s-grand-park.webp | removed | Unrelated subject ("children-s-grand-park") | — |
| knee-osteoarthritis-frailty-staying-steady-home-uk | cover-0202-busy-park.webp | removed | Unrelated subject ("busy-park") | — |
| knee-replacement-arthritis-uk | cover-0199-dil-chora-hospital-dire-dawa-ethiopia-2010.webp | removed | Unrelated subject ("dil-chora-hospital-dire-dawa-ethiopia-2010") | — |
| libraries-arthritis-frailty-getting-out-uk | cover-0461-hk-tsuen-wan-tsuen-king-circuit-allway-garden.webp | removed | Unrelated subject ("hk-tsuen-wan-tsuen-king-circuit-allway-garden") | — |
| local-wheelchair-service-arthritis-uk | cover-0150-melaka.webp | removed | Unrelated subject ("melaka") | — |
| longevity-habits-arthritis-patients | cover-0467-everything-comes-to-those-who-sit-and-wait.webp | removed | Unrelated subject ("everything-comes-to-those-who-sit-and-wait") | — |
| lower-back-stiffness-worse-after-sitting | cover-0161-haringey-dog-buggy.webp | removed | Unrelated subject ("haringey-dog-buggy") | — |
| lymphoedema-arthritis-frailty-uk | cover-0441-2014-us-open-synchronized-swimming-championsh.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| manage-arthritis-pain-flare-ups-night | cover-0295-tai-chi.webp | removed | Activity photo ("tai-chi") unrelated to this non-exercise topic | — |
| managing-arthritis-at-work | cover-0146-adelaide-street-brisbane-between-creek-and-ed.webp | removed | Unrelated subject ("adelaide-street-brisbane-between-creek-and-ed") | — |
| meal-delivery-arthritis-frailty-uk | cover-0435-400kcal-diet-020.webp | removed | Unrelated subject ("400kcal-diet-020") | — |
| medication-management-travel-arthritis | cover-0187-green-with-envy.webp | removed | Unrelated subject ("green-with-envy") | — |
| methotrexate-older-frail-adults-uk | cover-0411-think-outside-photo-contest-first-landing-sta.webp | removed | Unrelated subject ("think-outside-photo-contest-first-landing-sta") | — |
| midfoot-osteoarthritis-frailty-standing-time-uk | cover-0457-summer-peach-cake.webp | removed | Unrelated subject ("summer-peach-cake") | — |
| mindfulness-chronic-pain-arthritis-guide | cover-0125-chungking-mansions.webp | removed | Unrelated subject ("chungking-mansions") | — |
| mindfulness-pain-arthritis-frailty-uk | cover-0410-party-harder-31.webp | removed | Unrelated subject ("party-harder-31") | — |
| mobility-scooter-arthritis-frailty-uk | cover-0459-20171027-ams-lsc-0383.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| morning-routine-multi-joint-arthritis | cover-0478-20171027-ams-lsc-1286.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| morning-stiffness-frailty-routine-uk | cover-0460-harm-nia-swimming-pool-in-gy-mr-pest-county-h-81879b28.webp | removed | Swimming/pool photo ("harm-nia-swimming-pool-in-gy-mr-pest-county-h") on a post that is not about swimming or hydrotherapy | — |
| neck-osteoarthritis-frailty-balance-looking-down-uk | cover-0400-img-2792.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| nhs-access-to-biologics-how-the-approval-pathway-works | cover-0402-tree-face.webp | removed | Unrelated subject ("tree-face") | — |
| nhs-frailty-pathway-arthritis-england | cover-0203-dil-chora-hospital-dire-dawa-ethiopia-2010.webp | removed | Unrelated subject ("dil-chora-hospital-dire-dawa-ethiopia-2010") | — |
| nhs-rheumatologist-northern-ireland | cover-0482-profiled.webp | removed | Unrelated subject ("profiled") | — |
| night-lights-arthritis-falls-frailty-uk | cover-0185-street-photography-barnes-bridge-station.webp | removed | Unrelated subject ("street-photography-barnes-bridge-station") | — |
| nordic-poles-arthritis-frailty-uk | cover-0454-20171027-ams-lsc-0019.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| nsaids-and-arthritis-benefits-risks-and-safer-use | cover-0168-elderly-woman-with-dog-in-stroller.webp | removed | Photo subject ("elderly-woman-with-dog-in-stroller") does not match the post topic | — |
| nursing-home-arthritis-pain-review-uk | cover-0081-julio-shepherd-drive-bridge-over-white-oak-ba.webp | removed | Unrelated subject ("julio-shepherd-drive-bridge-over-white-oak-ba") | — |
| nutrition-strategies-reduce-frailty-risk | cover-0407-070630-n-8110k-014.webp | removed | Unrelated subject ("070630-n-8110k-014") | — |
| oa-vs-ra-comparison | cover-0443-frozen-yogurt-cups-sunshine-cups.webp | removed | Food photo ("frozen-yogurt-cups-sunshine-cups") on a non-diet post | — |
| occupational-therapist-kitchen-visit-frailty-uk | cover-0393-stinky-hotel-in-cancun-fiest-americana-villa.webp | removed | Unrelated subject ("stinky-hotel-in-cancun-fiest-americana-villa") | — |
| older-adults-arthritis-frailty-northern-ireland-uk | cover-0432-170813-z-vd276-007.webp | removed | Unrelated subject ("170813-z-vd276-007") | — |
| osteoarthritis-symptoms-uk | cover-0353-looking-up-from-the-vegetable-patch-towards-t.webp | removed | Unrelated subject ("looking-up-from-the-vegetable-patch-towards-t") | — |
| ot-assessment-arthritis-frailty-uk | cover-0454-wilted-kale-salad-with-deep-fried-garlic-lemo.webp | removed | Food photo ("wilted-kale-salad-with-deep-fried-garlic-lemo") on a non-diet post | — |
| outdoor-steps-handrails-arthritis-uk | cover-0431-swimming-pool-1961.webp | removed | Swimming/pool photo ("swimming-pool-1961") on a post that is not about swimming or hydrotherapy | — |
| pacing-housework-arthritis-frailty-uk | cover-0424-chesnut-road-looking-eastward-july-2012-cropp.webp | removed | Unrelated subject ("chesnut-road-looking-eastward-july-2012-cropp") | — |
| pacing-visitors-arthritis-frailty-uk | cover-0165-gillie-in-the-morning.webp | removed | Unrelated subject ("gillie-in-the-morning") | — |
| packing-list-arthritis-traveller | cover-0425-hk-skd-hang-hau-wan-lung-road-po-hong-park-ju.webp | removed | Unrelated subject ("hk-skd-hang-hau-wan-lung-road-po-hong-park-ju") | — |
| paracetamol-for-arthritis-pain-what-the-evidence-says | cover-0337-love-by-the-bridge.webp | removed | Unrelated subject ("love-by-the-bridge") | — |
| paramedic-fall-lift-arthritis-uk | cover-0481-20140918-nrcs-lsc-0350.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| parenting-with-arthritis-hacks-for-babies-and-toddlers | cover-0479-navidad.webp | removed | Unrelated subject ("navidad") | — |
| pendant-alarm-arthritis-swollen-fingers-uk | cover-0488-autumn-chick-pea-salad.webp | removed | Food photo ("autumn-chick-pea-salad") on a non-diet post | — |
| pendulum-swings-wall-slides-shoulder | cover-0216-141202-d-fw736-006.webp | removed | Unrelated subject ("141202-d-fw736-006") | — |
| pets-arthritis-frailty-walking-dogs-uk | cover-0330-i-hope-this-is-me-in-40-years.webp | removed | Unrelated subject ("i-hope-this-is-me-in-40-years") | — |
| physiotherapy-arthritis | cover-0461-20171027-ams-lsc-0093.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| physiotherapy-home-visit-frail-oa-uk | cover-0448-frozen-yogurt-cups-sunshine-cups.webp | removed | Food photo ("frozen-yogurt-cups-sunshine-cups") on a non-diet post | — |
| pip-arthritis-frailty-honest-uk | cover-0482-20171027-ams-lsc-0876.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| pip-fibromyalgia-denied-reapply | cover-0383-michelle-bristol-sciencewoman.webp | removed | Unrelated subject ("michelle-bristol-sciencewoman") | — |
| pip-for-arthritis-how-to-build-a-strong-application | cover-0475-20171027-ams-lsc-1150.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| pip-for-arthritis-uk | cover-0186-the-long-journey.webp | removed | Unrelated subject ("the-long-journey") | — |
| pip-osteoarthritis-both-knees | cover-0464-frozen-yogurt-cups-sunshine-cups.webp | removed | Food photo ("frozen-yogurt-cups-sunshine-cups") on a non-diet post | — |
| podiatry-footcare-arthritis-frailty-uk | cover-0437-greek-salad.webp | removed | Food photo ("greek-salad") on a non-diet post | — |
| podiatry-nails-diabetes-arthritis-uk | cover-0124-with-gaia-holmes.webp | removed | Unrelated subject ("with-gaia-holmes") | — |
| polyarticular-oa-frailty-pacing-several-joints-uk | cover-0462-20171027-ams-lsc-1300.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| polypharmacy-arthritis-frailty-review-uk | cover-0423-141002-d-db155-024.webp | removed | Unrelated subject ("141002-d-db155-024") | — |
| post-hip-replacement-frailty-home-uk | cover-0441-dinner-salad-from-the-templeton.webp | removed | Food photo ("dinner-salad-from-the-templeton") on a non-diet post | — |
| post-knee-replacement-frailty-rehab-uk | cover-0095-it-s-been-a-long-rainy-life.webp | removed | Unrelated subject ("it-s-been-a-long-rainy-life") | — |
| post-op-constipation-arthritis-frailty-uk | cover-0417-cancun-wreck-dive-c-58.webp | removed | Unrelated subject ("cancun-wreck-dive-c-58") | — |
| prescription-costs-and-arthritis-nhs-prepayment-certificates | cover-0104-beach-walk.webp | removed | Activity photo ("beach-walk") unrelated to this non-exercise topic | — |
| pressure-cushion-arthritis-frailty-uk | cover-0075-painting-of-one-of-your-creative-commons-phot.webp | removed | Unrelated subject ("painting-of-one-of-your-creative-commons-phot") | — |
| preventing-falls-guide-frail-adults | cover-0145-img-2419.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| preventing-knee-osteoarthritis-uk | cover-0371-woman-the-sea-and-the-castle-peniscola.webp | removed | Unrelated subject ("woman-the-sea-and-the-castle-peniscola") | — |
| private-rheumatology-in-the-uk-when-its-worth-considering | cover-0137-this-is-us.webp | removed | Unrelated subject ("this-is-us") | — |
| ra-fatigue-frailty-energy-envelope-uk | cover-0451-mushroom-salad-slices-of-tomato-and-lettuce.webp | removed | Food photo ("mushroom-salad-slices-of-tomato-and-lettuce") on a non-diet post | — |
| ra-frailty-older-adults-daily-rhythm-uk | cover-0086-i-don-t-understand-you.webp | removed | Unrelated subject ("i-don-t-understand-you") | — |
| ra-steroids-frailty-infection-watch-uk | cover-0457-broad-bean-almond-fetta-salad.webp | removed | Food photo ("broad-bean-almond-fetta-salad") on a non-diet post | — |
| reablement-after-discharge-arthritis-uk | cover-0077-marika.webp | removed | Unrelated subject ("marika") | — |
| reasonable-adjustments-that-actually-help | cover-0120-olive-oil-seller.webp | removed | Food photo ("olive-oil-seller") on a non-diet post | — |
| remote-gp-apps-arthritis-frailty-uk | cover-0403-img-8515-1.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| repeat-prescriptions-arthritis-frailty-uk | cover-0419-learning-to-swim.webp | removed | Swimming/pool photo ("learning-to-swim") on a post that is not about swimming or hydrotherapy | — |
| resistance-bands-seated-frail-oa-uk | cover-0418-learning-to-swim.webp | removed | Swimming/pool photo ("learning-to-swim") on a post that is not about swimming or hydrotherapy | — |
| resistance-training-arthritis-longevity | cover-0482-20120905-fns-lsc-0156.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| restless-nights-joint-pain-frailty-uk | cover-0437-warm-spinach-mushroom-salad.webp | removed | Food photo ("warm-spinach-mushroom-salad") on a non-diet post | — |
| rheumatology-clinic-frail-older-adult-uk | cover-0336-rednotebook2009-pg-20.webp | removed | Unrelated subject ("rednotebook2009-pg-20") | — |
| rheumatology-waiting-times-uk | cover-0431-benching-freight-wall-graffiti-in-socal-may-1.webp | removed | Unrelated subject ("benching-freight-wall-graffiti-in-socal-may-1") | — |
| rise-recline-chair-arthritis-frailty-uk | cover-0483-perfect-garden.webp | removed | Unrelated subject ("perfect-garden") | — |
| rural-living-arthritis-frailty-uk | cover-0475-20120106-oc-amw-0754.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| seasonal-affective-disorder-arthritis | cover-0468-tortellini-salad.webp | removed | Food photo ("tortellini-salad") on a non-diet post | — |
| seasonal-arthritis-guide-uk | cover-0407-05-santa-barbara-canyon-road-views-5-fox-moun.webp | removed | Unrelated subject ("05-santa-barbara-canyon-road-views-5-fox-moun") | — |
| shingles-vaccine-arthritis-frailty-uk | cover-0448-monster-salad.webp | removed | Food photo ("monster-salad") on a non-diet post | — |
| shopping-online-arthritis-frailty-uk | cover-0484-bordesley-middleway-camp-hill-site-of-the-shi.webp | removed | Unrelated subject ("bordesley-middleway-camp-hill-site-of-the-shi") | — |
| short-term-equipment-loans-arthritis-uk | cover-0477-20171027-ams-lsc-1188.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| should-you-tell-your-employer-about-your-arthritis | cover-0433-salad.webp | removed | Food photo ("salad") on a non-diet post | — |
| shoulder-arthroscopy-and-arthritis-what-it-can-and-cant-fix | cover-0466-20171027-ams-lsc-0014.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| shoulder-osteoarthritis-frailty-washing-dressing-uk | cover-0173-0524071143-jpg.webp | removed | Unrelated subject ("0524071143-jpg") | — |
| shoulder-pain-reaching-ra-vs-oa | cover-0100-the-walk-la-promenade.webp | removed | Activity photo ("the-walk-la-promenade") unrelated to this non-exercise topic | — |
| signs-rheumatoid-arthritis-early-stages | cover-0418-balboa-park-san-diego-ca-usa-near-future-comi.webp | removed | Unrelated subject ("balboa-park-san-diego-ca-usa-near-future-comi") | — |
| sit-to-stand-practice-frail-arthritis-uk | cover-0449-20171027-ams-lsc-0131.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| sleeping-tablets-falls-arthritis-frailty-uk | cover-0444-file-learning-to-swim-8812288262-jpg.webp | removed | Swimming/pool photo ("file-learning-to-swim-8812288262-jpg") on a post that is not about swimming or hydrotherapy | — |
| slow-walking-groups-arthritis-frailty-uk | cover-0465-20171027-ams-lsc-1227.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| smart-speakers-arthritis-frailty-uk | cover-0469-20171027-ams-lsc-1375.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| social-care-needs-assessment-arthritis-uk | cover-0346-the-great-unconformity.webp | removed | Unrelated subject ("the-great-unconformity") | — |
| social-prescribing-arthritis-frailty-uk | cover-0455-clementines.webp | removed | Food photo ("clementines") on a non-diet post | — |
| speech-swallowing-meals-arthritis-frailty-uk | cover-0300-roy-wilkins-park-td-2019-01-13-025-outdoor-fi.webp | removed | Unrelated subject ("roy-wilkins-park-td-2019-01-13-025-outdoor-fi") | — |
| spinal-arthritis-back-pain-uk | cover-0213-back-step-stretch.webp | removed | Activity photo ("back-step-stretch") unrelated to this non-exercise topic | — |
| spine-oa-frailty-gardening-pacing-uk | cover-0466-cup-of-tea-by-a-lake.webp | removed | Food photo ("cup-of-tea-by-a-lake") on a non-diet post | — |
| spiritual-care-arthritis-frailty-uk | cover-0437-file-minh-khai-s-swimming-pool-jpg.webp | removed | Swimming/pool photo ("file-minh-khai-s-swimming-pool-jpg") on a post that is not about swimming or hydrotherapy | — |
| splints-night-hand-oa-frailty-uk | cover-0367-deployed-386th-firefighters-train-to-survive-.webp | removed | Unrelated subject ("deployed-386th-firefighters-train-to-survive-") | — |
| stair-assessments-arthritis-frailty-uk | cover-0439-file-learning-to-swim-8801703203-jpg.webp | removed | Swimming/pool photo ("file-learning-to-swim-8801703203-jpg") on a post that is not about swimming or hydrotherapy | — |
| stairlifts-arthritis-frailty-uk-home | cover-0447-20171027-ams-lsc-1212.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| static-bike-frail-osteoarthritis-uk | cover-0214-141202-d-fw736-007.webp | removed | Unrelated subject ("141202-d-fw736-007") | — |
| staying-active-arthritis-winter-uk | cover-0434-salad.webp | removed | Food photo ("salad") on a non-diet post | — |
| steroid-emergency-card-frail-arthritis-uk | cover-0471-20171027-ams-lsc-1562.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| steroid-injections-vs-oral-steroids-when-each-makes-sense | cover-0166-nordic-walking-groentenmarkt-gent.webp | removed | Activity photo ("nordic-walking-groentenmarkt-gent") unrelated to this non-exercise topic | — |
| stopping-arthritis-medication-safely-a-step-by-step-guide | cover-0398-the-stars-aren-t-looking-too-good-for-this-ge.webp | removed | Unrelated subject ("the-stars-aren-t-looking-too-good-for-this-ge") | — |
| straight-leg-raises-knee-osteoarthritis | cover-0473-20171027-ams-lsc-1634.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| strength-training-on-biologics-is-it-safe | cover-0460-the-trentham-estate-west-midlands-ambulance-s.webp | removed | Unrelated subject ("the-trentham-estate-west-midlands-ambulance-s") | — |
| support-friend-diagnosed-lupus | cover-0474-antique-zinia.webp | removed | Unrelated subject ("antique-zinia") | — |
| supporting-a-partner-with-arthritis-a-practical-handbook | cover-0344-bathing.webp | removed | Unrelated subject ("bathing") | — |
| swelling-legs-arthritis-frailty-uk | cover-0478-the-trentham-estate-barlaston-community-first.webp | removed | Unrelated subject ("the-trentham-estate-barlaston-community-first") | — |
| tai-chi-balance-arthritis-frailty-uk | cover-0472-20171027-ams-lsc-1082.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| tai-chi-for-arthritis-uk | cover-0328-my-left-knee.webp | removed | Unrelated subject ("my-left-knee") | — |
| talk-employer-rheumatoid-arthritis-work | cover-0169-the-visit-to-a-local-family-turned-out-to-be-.webp | removed | Unrelated subject ("the-visit-to-a-local-family-turned-out-to-be-") | — |
| tapering-biologics-what-the-latest-trials-show | cover-0373-very-nice-view-from-the-room-overlooking-riu.webp | removed | Unrelated subject ("very-nice-view-from-the-room-overlooking-riu") | — |
| tens-machine-older-frail-arthritis-uk | cover-0339-colourful-art.webp | removed | Unrelated subject ("colourful-art") | — |
| tens-machines-arthritis-uk | cover-0458-green-salad-3.webp | removed | Food photo ("green-salad-3") on a non-diet post | — |
| thumb-base-osteoarthritis-frailty-daily-grip-uk | cover-0160-siem-reap-s-celebrated-pub-street.webp | removed | Unrelated subject ("siem-reap-s-celebrated-pub-street") | — |
| thumb-base-pain-early-hand-arthritis | cover-0472-salad-greens-two-ways.webp | removed | Food photo ("salad-greens-two-ways") on a non-diet post | — |
| toilet-frame-arthritis-frailty-uk | cover-0435-birla-senior-secondary-school-swimming-pool.webp | removed | Swimming/pool photo ("birla-senior-secondary-school-swimming-pool") on a post that is not about swimming or hydrotherapy | — |
| topical-nsaids-often-overlooked-often-effective | cover-0480-quinoa-salad.webp | removed | Food photo ("quinoa-salad") on a non-diet post | — |
| total-knee-replacement-a-uk-patients-guide-for-2026 | cover-0476-20171027-ams-lsc-1630.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| transfer-board-arthritis-frailty-uk | cover-0397-water-exercise.webp | removed | Swimming/pool photo ("water-exercise") on a post that is not about swimming or hydrotherapy | — |
| universal-credit-and-arthritis-limited-capability-for-work | cover-0405-phoenix-az-45.webp | removed | Unrelated subject ("phoenix-az-45") | — |
| university-with-arthritis-disability-support-and-dsa | cover-0460-20171027-ams-lsc-0065.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| uti-confusion-arthritis-frailty-uk | cover-0453-uni-duo.webp | removed | Unrelated subject ("uni-duo") | — |
| vision-falls-arthritis-frailty-uk | cover-0416-learning-to-swim.webp | removed | Swimming/pool photo ("learning-to-swim") on a post that is not about swimming or hydrotherapy | — |
| volunteering-seated-arthritis-frailty-uk | cover-0442-roasted-brussels-sprouts.webp | removed | Food photo ("roasted-brussels-sprouts") on a non-diet post | — |
| walking-30-minutes-a-day-while-on-dmards-a-practical-plan | cover-0473-kale-salad.webp | removed | Food photo ("kale-salad") on a non-diet post | — |
| walking-sport-too-much-frail-arthritis-uk | cover-0414-learning-to-swim.webp | removed | Swimming/pool photo ("learning-to-swim") on a post that is not about swimming or hydrotherapy | — |
| what-sustained-remission-means-in-ra | cover-0193-dsc-0463.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| wheelchair-for-distance-arthritis-frailty-uk | cover-0375-10070021.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| why-exercise-makes-your-arthritis-medication-work-better | cover-0380-the-dip-ii-la-baignade-ii.webp | removed | Swimming/pool photo ("the-dip-ii-la-baignade-ii") on a post that is not about swimming or hydrotherapy | — |
| winter-arthritis-frailty-cold-houses-uk | cover-0416-feeding-time.webp | removed | Unrelated subject ("feeding-time") | — |
| wrist-hand-oa-frailty-self-care-uk | cover-0191-zam072509238.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| yoga-ankylosing-spondylitis-stiffness | cover-0467-20171027-ams-lsc-1627.webp | removed | Checked by eye: photo subject unrelated to the post topic | — |
| anti-inflammatory-diet | nutrition-11-bowl-of-fresh-fruit-unsplash.webp | replaced | Better topic match available; replaced with existing repo image (platter of vegetables and dips) | commons-anti-inflammatory-diet-for-arthritis-651bea.webp |
| arthritis-and-work-uk | cover-0427-broken-paving-park-view-road.webp | replaced | Unrelated subject ("broken-paving-park-view-road"); replaced with existing repo image (two people working at office desks) | commons-arthritis-at-work-8cd1ea.webp |
| best-breakfast-for-arthritis-uk | lwa-best-breakfast-for-arthritis-uk.webp | replaced | Better topic match available; replaced with existing repo image (chopping carrots) | commons-best-breakfast-for-arthritis-uk-5e404f.webp |
| blue-badge-frailty-arthritis-uk | cover-0464-hk-tsuen-wan-tsuen-king-circuit-allway-garden.webp | replaced | Unrelated subject ("hk-tsuen-wan-tsuen-king-circuit-allway-garden"); replaced with existing repo image (hand filling in a form) | commons-blue-badge-scheme-and-arthritis-cf567b.webp |
| calcium-foods-arthritis-frailty-uk | cover-0469-organic-olive-oil-salad.webp | replaced | Better topic match available; replaced with existing repo image (plate of vegetables and fruit) | commons-calcium-and-bone-health-08aa02.webp |
| chair-yoga-frailty-inflammatory-arthritis-uk | cover-0445-frozen-yogurt-cups-sunshine-cups.webp | replaced | Food photo ("frozen-yogurt-cups-sunshine-cups") on a non-diet post; replaced with existing repo image (older adults in an exercise class) | commons-best-exercise-for-rheumatoid-arthritis-c26cdc.webp |
| dosette-boxes-arthritis-frailty-hands-uk | cover-0427-learning-to-swim.webp | replaced | Swimming/pool photo ("learning-to-swim") on a post that is not about swimming or hydrotherapy; replaced with existing repo image (weekly pill organiser) | commons-gout-causes-symptoms-and-treatment-11ce46.webp |
| exercise-for-hip-arthritis | cover-0480-20171027-ams-lsc-1597.webp | replaced | Checked by eye: photo subject unrelated to the post topic; replaced with existing repo image (older woman doing a leg exercise on a mat at home) | commons-home-exercise-programme-for-arthritis-b1248e.webp |
| exercises-rheumatoid-arthritis-hands-wrists | cover-0413-cancun-manchones-la-cruz.webp | replaced | Unrelated subject ("cancun-manchones-la-cruz"); replaced with existing repo image (older person's hands clasped) | commons-hand-exercises-for-arthritis-79ba42.webp |
| gut-health-arthritis-connection | cover-0462-bowl-of-kale.webp | replaced | Better topic match available; replaced with existing repo image (man cooking at a stove) | commons-gut-health-arthritis-connection-f33403.webp |
| hydrotherapy-arthritis-uk | cover-0142-pat.webp | replaced | Unrelated subject ("pat"); replaced with existing repo image (outdoor swimming pool) | commons-hydrotherapy-for-arthritis-1e5f8f.webp |
| mediterranean-diet-arthritis-14-day-plan | nutrition-01-oliven-v1.webp | replaced | Better topic match available; replaced with existing repo image (woman preparing a meal in a kitchen) | commons-mediterranean-diet-and-arthritis-0ac868.webp |
| reablement-team-arthritis-home-practice-uk | cover-0452-potato-salad.webp | replaced | Food photo ("potato-salad") on a non-diet post; replaced with existing repo image (older woman stretching at home) | commons-reablement-team-arthritis-home-practice-uk-3ec3ac.webp |
| rheumatoid-arthritis-diet-uk | cover-0440-tomato-bread-salad.webp | replaced | Better topic match available; replaced with existing repo image (vegetable and rice dish) | commons-diet-for-rheumatoid-arthritis-dfba66.webp |
| shoulder-arthritis-exercises-uk | cover-0456-salad.webp | replaced | Food photo ("salad") on a non-diet post; replaced with existing repo image (adults exercising on mats in a studio class) | commons-pilates-for-arthritis-c562ea.webp |
| swimming-for-arthritis | cover-0130-squishy-feet-rain-closed-stores-but-i-still-l.webp | replaced | Unrelated subject ("squishy-feet-rain-closed-stores-but-i-still-l"); replaced with existing repo image (people swimming in an indoor pool) | commons-swimming-for-arthritis-8a650c.webp |
| turmeric-for-arthritis | cover-0438-spinach-salad.webp | replaced | Better topic match available; replaced with existing repo image (turmeric-coloured vegetable dish) | commons-turmeric-for-arthritis-96c722.webp |
| yoga-for-arthritis | cover-0432-grilled-chicken-salad-with-strawberries-apple.webp | replaced | Food photo ("grilled-chicken-salad-with-strawberries-apple") on a non-diet post; replaced with existing repo image (adults doing seated yoga stretches) | commons-yoga-for-arthritis-45851b.webp |
| yoga-for-arthritis-beginners | cover-0379-old-man-taking-a-dip-in-the-sea-vieil-homme-s.webp | replaced | Swimming/pool photo ("old-man-taking-a-dip-in-the-sea-vieil-homme-s") on a post that is not about swimming or hydrotherapy; replaced with existing repo image (woman in a seated yoga pose) | commons-yoga-for-arthritis-b86ca5.webp |
| your-workplace-rights-with-arthritis-the-equality-act-2010 | cover-0460-macrobiotic-food.webp | replaced | Food photo ("macrobiotic-food") on a non-diet post; replaced with existing repo image (illustration of a checklist) | commons-employment-rights-for-people-with-arthritis-31f004.webp |

## Inline images removed from post bodies

| Post | Image | Reason |
|---|---|---|
| anti-inflammatory-herbs-spices-arthritis | cover-0483-20171027-ams-lsc-0164.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| arthritis-and-cycling-uk | cover-0313-dorchester-senior-center.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| arthritis-and-work-uk | cover-0427-broken-paving-park-view-road.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| arthritis-pain-relief-natural | cover-0423-learning-to-swim.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| arthritis-physiotherapy-nhs-waiting-list | community-08-physical-therapy-teaching-lab-at-cu-anschutz-octob.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| arthritis-support-groups-glasgow | community-05-pride-be-2018-2018-05-19-16-47-31-ilce-6500-dsc081.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| arthritis-support-groups-glasgow | community-04-renewing-bonds-family-reconnects-at-4th-asog-marri.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| arthritis-support-groups-glasgow | community-07-2018-05-19-15-31-50-ilce-6500-dsc08438-dxo.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| arthritis-support-groups-manchester | community-02-wolf-creek-nfh-2022-13th-annual-catch-a-smile-seni.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| arthritis-support-groups-manchester | community-07-2018-05-19-15-31-50-ilce-6500-dsc08438-dxo.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| arthritis-support-groups-manchester | community-04-renewing-bonds-family-reconnects-at-4th-asog-marri.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| arthritis-support-groups-scotland | community-02-wolf-creek-nfh-2022-13th-annual-catch-a-smile-seni.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| arthritis-support-groups-scotland | community-04-renewing-bonds-family-reconnects-at-4th-asog-marri.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| arthritis-support-groups-scotland | community-07-2018-05-19-15-31-50-ilce-6500-dsc08438-dxo.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| arthritis-support-groups-wales | community-06-pride-be-2018-2018-05-19-15-19-41-ilce-6500-dsc082.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| arthritis-support-groups-wales | community-04-renewing-bonds-family-reconnects-at-4th-asog-marri.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| arthritis-support-groups-wales | community-01-an-elderly-tibetan-women-holding-a-prayer-wheel-on.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| best-exercises-osteoarthritis-knee-pain-home | community-08-physical-therapy-teaching-lab-at-cu-anschutz-octob.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| blue-badge-arthritis-scotland | community-01-an-elderly-tibetan-women-holding-a-prayer-wheel-on.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| early-signs-gout-big-toe | nutrition-01-oliven-v1.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| exercises-rheumatoid-arthritis-hands-wrists | community-08-physical-therapy-teaching-lab-at-cu-anschutz-octob.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| fibromyalgia-flare-ups-without-medication | community-04-renewing-bonds-family-reconnects-at-4th-asog-marri.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| foot-and-ankle-arthritis-uk | community-02-wolf-creek-nfh-2022-13th-annual-catch-a-smile-seni.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| free-arthritis-exercise-classes-england | community-02-wolf-creek-nfh-2022-13th-annual-catch-a-smile-seni.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| free-arthritis-support-northern-ireland | community-01-an-elderly-tibetan-women-holding-a-prayer-wheel-on.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| free-arthritis-support-northern-ireland | community-08-physical-therapy-teaching-lab-at-cu-anschutz-octob.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| free-arthritis-support-northern-ireland | community-04-renewing-bonds-family-reconnects-at-4th-asog-marri.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| hydrotherapy-arthritis-uk | cover-0142-pat.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| knee-arthritis-exercises-uk | cover-0450-frozen-yogurt-cups-sunshine-cups.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| nhs-rheumatologist-northern-ireland | community-08-physical-therapy-teaching-lab-at-cu-anschutz-octob.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| nhs-rheumatologist-northern-ireland | community-09-us-navy-100306-n-5319a-020-occupational-therapist-.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| pip-fibromyalgia-denied-reapply | community-01-an-elderly-tibetan-women-holding-a-prayer-wheel-on.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| pip-fibromyalgia-denied-reapply | community-04-renewing-bonds-family-reconnects-at-4th-asog-marri.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| pip-fibromyalgia-uk-apply | community-01-an-elderly-tibetan-women-holding-a-prayer-wheel-on.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| pip-fibromyalgia-uk-apply | community-04-renewing-bonds-family-reconnects-at-4th-asog-marri.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| psoriatic-vs-rheumatoid-arthritis | community-09-us-navy-100306-n-5319a-020-occupational-therapist-.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| signs-rheumatoid-arthritis-early-stages | community-09-us-navy-100306-n-5319a-020-occupational-therapist-.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| support-friend-diagnosed-lupus | community-05-pride-be-2018-2018-05-19-16-47-31-ilce-6500-dsc081.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| support-friend-diagnosed-lupus | community-06-pride-be-2018-2018-05-19-15-19-41-ilce-6500-dsc082.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| support-friend-diagnosed-lupus | community-07-2018-05-19-15-31-50-ilce-6500-dsc08438-dxo.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| swimming-exercises-hip-osteoarthritis | community-08-physical-therapy-teaching-lab-at-cu-anschutz-octob.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| tai-chi-arthritis-joint-pain | community-02-wolf-creek-nfh-2022-13th-annual-catch-a-smile-seni.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| talk-employer-rheumatoid-arthritis-work | community-07-2018-05-19-15-31-50-ilce-6500-dsc08438-dxo.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| talk-employer-rheumatoid-arthritis-work | community-04-renewing-bonds-family-reconnects-at-4th-asog-marri.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| talk-employer-rheumatoid-arthritis-work | community-09-us-navy-100306-n-5319a-020-occupational-therapist-.webp | Off-topic for the post (unrelated scene, event, place, or object) |
| yoga-for-arthritis-beginners | cover-0379-old-man-taking-a-dip-in-the-sea-vieil-homme-s.webp | Off-topic for the post (unrelated scene, event, place, or object) |

## Covers kept

303 covers were checked and kept as relevant to their post.

## Follow-up: AI-generated covers, internal links, CTA and link check

### AI-generated covers
- 278 of the 278 posts left without a cover now use an **AI-generated** illustration (warm, realistic, topic-matched; no text, no logos, no real or named people).
- Files: `public/openverse/ai-<slug>.webp` (1024x576 WebP, quality 80). Each is listed in `public/openverse/ATTRIBUTION.json` with `"source": "ai-generated"`, and `scripts/generate-cover-credits.mjs` credits them as "AI-generated illustration".
- 0 posts still use the branded placeholder card and are queued for AI covers.

| Post | Cover |
|---|---|
| activity-diary-arthritis-frailty-uk | AI-generated: `ai-activity-diary-arthritis-frailty-uk.webp` |
| advance-care-planning-arthritis-frailty-uk | AI-generated: `ai-advance-care-planning-arthritis-frailty-uk.webp` |
| alcohol-arthritis-uk-guidance | AI-generated: `ai-alcohol-arthritis-uk-guidance.webp` |
| anaesthetic-risk-arthritis-frailty-uk | AI-generated: `ai-anaesthetic-risk-arthritis-frailty-uk.webp` |
| anticholinergic-load-arthritis-frailty-uk | AI-generated: `ai-anticholinergic-load-arthritis-frailty-uk.webp` |
| anxiety-arthritis-uk-guide | AI-generated: `ai-anxiety-arthritis-uk-guide.webp` |
| appeal-rejected-pip-arthritis | AI-generated: `ai-appeal-rejected-pip-arthritis.webp` |
| apprenticeships-and-arthritis-a-realistic-look | AI-generated: `ai-apprenticeships-and-arthritis-a-realistic-look.webp` |
| arthritis-and-alcohol-uk | AI-generated: `ai-arthritis-and-alcohol-uk.webp` |
| arthritis-and-pets-uk | AI-generated: `ai-arthritis-and-pets-uk.webp` |
| arthritis-and-pregnancy-uk | AI-generated: `ai-arthritis-and-pregnancy-uk.webp` |
| arthritis-and-sleep-problems | AI-generated: `ai-arthritis-and-sleep-problems.webp` |
| arthritis-hows-life-living-with-arthritis | AI-generated: `ai-arthritis-hows-life-living-with-arthritis.webp` |
| arthritis-in-older-adults | AI-generated: `ai-arthritis-in-older-adults.webp` |
| arthritis-in-young-adults | AI-generated: `ai-arthritis-in-young-adults.webp` |
| arthritis-pain-management | AI-generated: `ai-arthritis-pain-management.webp` |
| arthritis-pain-relief-natural | AI-generated: `ai-arthritis-pain-relief-natural.webp` |
| arthritis-physiotherapy-nhs-waiting-list | AI-generated: `ai-arthritis-physiotherapy-nhs-waiting-list.webp` |
| arthritis-relationships-honest-conversations | AI-generated: `ai-arthritis-relationships-honest-conversations.webp` |
| arthritis-support-groups-glasgow | AI-generated: `ai-arthritis-support-groups-glasgow.webp` |
| arthritis-support-groups-manchester | AI-generated: `ai-arthritis-support-groups-manchester.webp` |
| arthritis-support-groups-wales | AI-generated: `ai-arthritis-support-groups-wales.webp` |
| arthritis-support-refugees-diverse-communities | AI-generated: `ai-arthritis-support-refugees-diverse-communities.webp` |
| arthritis-treatment-hub | AI-generated: `ai-arthritis-treatment-hub.webp` |
| assistive-devices-arthritis-uk | AI-generated: `ai-assistive-devices-arthritis-uk.webp` |
| attendance-allowance-arthritis-frailty-uk | AI-generated: `ai-attendance-allowance-arthritis-frailty-uk.webp` |
| balance-painful-feet-frailty-arthritis-uk | AI-generated: `ai-balance-painful-feet-frailty-arthritis-uk.webp` |
| bed-exercises-hospital-arthritis-frailty-uk | AI-generated: `ai-bed-exercises-hospital-arthritis-frailty-uk.webp` |
| bed-lever-arthritis-frailty-uk | AI-generated: `ai-bed-lever-arthritis-frailty-uk.webp` |
| bedtime-routine-arthritis-relief | AI-generated: `ai-bedtime-routine-arthritis-relief.webp` |
| bereavement-arthritis-frailty-living-alone-uk | AI-generated: `ai-bereavement-arthritis-frailty-living-alone-uk.webp` |
| best-plantar-fasciitis-shoes-women-uk | AI-generated: `ai-best-plantar-fasciitis-shoes-women-uk.webp` |
| best-sleep-positions-joint-pain | AI-generated: `ai-best-sleep-positions-joint-pain.webp` |
| best-supplement-for-knee-joint | AI-generated: `ai-best-supplement-for-knee-joint.webp` |
| best-supplements-arthritis-uk | AI-generated: `ai-best-supplements-arthritis-uk.webp` |
| best-supplements-joint-pain | AI-generated: `ai-best-supplements-joint-pain.webp` |
| big-toe-osteoarthritis-frailty-shoes-balance-uk | AI-generated: `ai-big-toe-osteoarthritis-frailty-shoes-balance-uk.webp` |
| biologic-side-effects-infections-injections-and-monitoring | AI-generated: `ai-biologic-side-effects-infections-injections-and-monitoring.webp` |
| blood-test-transport-arthritis-frailty-uk | AI-generated: `ai-blood-test-transport-arthritis-frailty-uk.webp` |
| blue-badge-arthritis-scotland | AI-generated: `ai-blue-badge-arthritis-scotland.webp` |
| bone-clinic-arthritis-frailty-uk | AI-generated: `ai-bone-clinic-arthritis-frailty-uk.webp` |
| bone-protection-steroids-arthritis-frailty-uk | AI-generated: `ai-bone-protection-steroids-arthritis-frailty-uk.webp` |
| building-strength-resilience-exercise-frailty-prevention | AI-generated: `ai-building-strength-resilience-exercise-frailty-prevention.webp` |
| caregiver-burnout-in-arthritis-families-spot-it-early | AI-generated: `ai-caregiver-burnout-in-arthritis-families-spot-it-early.webp` |
| carer-burnout-arthritis-frailty-uk | AI-generated: `ai-carer-burnout-arthritis-frailty-uk.webp` |
| carers-assessment-arthritis-frailty-uk | AI-generated: `ai-carers-assessment-arthritis-frailty-uk.webp` |
| cbt-chronic-pain-arthritis | AI-generated: `ai-cbt-chronic-pain-arthritis.webp` |
| chair-based-exercise-ra-frailty-uk | AI-generated: `ai-chair-based-exercise-ra-frailty-uk.webp` |
| chest-infection-arthritis-frailty-uk | AI-generated: `ai-chest-infection-arthritis-frailty-uk.webp` |
| cognition-arthritis-frailty-remembering-tablets-uk | AI-generated: `ai-cognition-arthritis-frailty-remembering-tablets-uk.webp` |
| cold-weather-arthritis-uk-winter | AI-generated: `ai-cold-weather-arthritis-uk-winter.webp` |
| community-alarm-arthritis-frailty-uk | AI-generated: `ai-community-alarm-arthritis-frailty-uk.webp` |
| community-ot-waiting-arthritis-frailty-uk | AI-generated: `ai-community-ot-waiting-arthritis-frailty-uk.webp` |
| community-physio-wait-frail-arthritis-uk | AI-generated: `ai-community-physio-wait-frail-arthritis-uk.webp` |
| community-strength-classes-frail-oa-uk | AI-generated: `ai-community-strength-classes-frail-oa-uk.webp` |
| community-transport-arthritis-frailty-uk | AI-generated: `ai-community-transport-arthritis-frailty-uk.webp` |
| confidence-after-fall-arthritis-frailty-uk | AI-generated: `ai-confidence-after-fall-arthritis-frailty-uk.webp` |
| constipation-pain-medicines-frailty-arthritis-uk | AI-generated: `ai-constipation-pain-medicines-frailty-arthritis-uk.webp` |
| copd-arthritis-frailty-breathlessness-uk | AI-generated: `ai-copd-arthritis-frailty-breathlessness-uk.webp` |
| core-strengthening-spinal-arthritis | AI-generated: `ai-core-strengthening-spinal-arthritis.webp` |
| deconditioning-after-arthritis-flare-uk | AI-generated: `ai-deconditioning-after-arthritis-flare-uk.webp` |
| delirium-hospital-arthritis-frailty-uk | AI-generated: `ai-delirium-hospital-arthritis-frailty-uk.webp` |
| dental-care-arthritis-frailty-hands-uk | AI-generated: `ai-dental-care-arthritis-frailty-hands-uk.webp` |
| depression-arthritis-when-to-seek-help | AI-generated: `ai-depression-arthritis-when-to-seek-help.webp` |
| desk-setup-arthritis-uk-workers | AI-generated: `ai-desk-setup-arthritis-uk-workers.webp` |
| diabetes-arthritis-frailty-feet-uk | AI-generated: `ai-diabetes-arthritis-frailty-feet-uk.webp` |
| direct-payments-arthritis-frailty-uk | AI-generated: `ai-direct-payments-arthritis-frailty-uk.webp` |
| disability-rights-workplace-arthritis | AI-generated: `ai-disability-rights-workplace-arthritis.webp` |
| discharge-planning-arthritis-frailty-uk | AI-generated: `ai-discharge-planning-arthritis-frailty-uk.webp` |
| dmards-explained-how-methotrexate-slows-rheumatoid-arthritis | AI-generated: `ai-dmards-explained-how-methotrexate-slows-rheumatoid-arthritis.webp` |
| early-arthritis-intervention-uk | AI-generated: `ai-early-arthritis-intervention-uk.webp` |
| early-signs-gout-big-toe | AI-generated: `ai-early-signs-gout-big-toe.webp` |
| elbow-osteoarthritis-frailty-kitchen-tasks-uk | AI-generated: `ai-elbow-osteoarthritis-frailty-kitchen-tasks-uk.webp` |
| end-of-life-joint-pain-frailty-uk | AI-generated: `ai-end-of-life-joint-pain-frailty-uk.webp` |
| exam-adjustments-for-students-with-arthritis | AI-generated: `ai-exam-adjustments-for-students-with-arthritis.webp` |
| expert-brief-activity-safety-knee-arthritis | AI-generated: `ai-expert-brief-activity-safety-knee-arthritis.webp` |
| expert-brief-exercise-order-pain-relief | AI-generated: `ai-expert-brief-exercise-order-pain-relief.webp` |
| expert-brief-frozen-shoulder-vs-ra | AI-generated: `ai-expert-brief-frozen-shoulder-vs-ra.webp` |
| expert-qa-are-steroid-tapers-always-necessary | AI-generated: `ai-expert-qa-are-steroid-tapers-always-necessary.webp` |
| expert-qa-exercising-through-a-flare-up | AI-generated: `ai-expert-qa-exercising-through-a-flare-up.webp` |
| expert-qa-how-to-ask-for-help-without-feeling-guilty | AI-generated: `ai-expert-qa-how-to-ask-for-help-without-feeling-guilty.webp` |
| expert-qa-how-to-talk-to-your-gp-about-medication-worries | AI-generated: `ai-expert-qa-how-to-talk-to-your-gp-about-medication-worries.webp` |
| expert-qa-is-it-too-soon-for-joint-replacement | AI-generated: `ai-expert-qa-is-it-too-soon-for-joint-replacement.webp` |
| expert-qa-is-it-worth-paying-for-a-second-opinion | AI-generated: `ai-expert-qa-is-it-worth-paying-for-a-second-opinion.webp` |
| expert-qa-returning-to-work-after-a-bad-flare | AI-generated: `ai-expert-qa-returning-to-work-after-a-bad-flare.webp` |
| expert-qa-should-you-start-dmards-at-diagnosis | AI-generated: `ai-expert-qa-should-you-start-dmards-at-diagnosis.webp` |
| expert-qa-why-did-my-arthritis-come-back | AI-generated: `ai-expert-qa-why-did-my-arthritis-come-back.webp` |
| expert-qa-will-my-children-inherit-my-arthritis | AI-generated: `ai-expert-qa-will-my-children-inherit-my-arthritis.webp` |
| explain-juvenile-arthritis-school-teachers | AI-generated: `ai-explain-juvenile-arthritis-school-teachers.webp` |
| extra-care-housing-arthritis-frailty-uk | AI-generated: `ai-extra-care-housing-arthritis-frailty-uk.webp` |
| eye-clinic-day-arthritis-frailty-uk | AI-generated: `ai-eye-clinic-day-arthritis-frailty-uk.webp` |
| falls-response-service-arthritis-uk | AI-generated: `ai-falls-response-service-arthritis-uk.webp` |
| family-meetings-arthritis-frailty-uk | AI-generated: `ai-family-meetings-arthritis-frailty-uk.webp` |
| fear-of-falling-hip-oa-frailty-uk | AI-generated: `ai-fear-of-falling-hip-oa-frailty-uk.webp` |
| flare-management-pain-spikes | AI-generated: `ai-flare-management-pain-spikes.webp` |
| flare-versus-frailty-arthritis-uk | AI-generated: `ai-flare-versus-frailty-arthritis-uk.webp` |
| flexible-working-arthritis-pacing | AI-generated: `ai-flexible-working-arthritis-pacing.webp` |
| flu-jab-arthritis-frailty-uk | AI-generated: `ai-flu-jab-arthritis-frailty-uk.webp` |
| footwear-indoor-slippers-frailty-arthritis-uk | AI-generated: `ai-footwear-indoor-slippers-frailty-arthritis-uk.webp` |
| frailty-older-people-arthritis-wales-uk | AI-generated: `ai-frailty-older-people-arthritis-wales-uk.webp` |
| free-arthritis-support-northern-ireland | AI-generated: `ai-free-arthritis-support-northern-ireland.webp` |
| fried-frailty-phenotype-painful-joints-uk | AI-generated: `ai-fried-frailty-phenotype-painful-joints-uk.webp` |
| gabapentinoids-unsteadiness-arthritis-frailty-uk | AI-generated: `ai-gabapentinoids-unsteadiness-arthritis-frailty-uk.webp` |
| gene-therapy-and-arthritis-where-are-we-in-2026 | AI-generated: `ai-gene-therapy-and-arthritis-where-are-we-in-2026.webp` |
| generalised-oa-frailty-whole-body-day-uk | AI-generated: `ai-generalised-oa-frailty-whole-body-day-uk.webp` |
| geriatric-clinic-plus-arthritis-uk | AI-generated: `ai-geriatric-clinic-plus-arthritis-uk.webp` |
| glucosamine-vs-collagen | AI-generated: `ai-glucosamine-vs-collagen.webp` |
| glute-bridges-hip-osteoarthritis-guide | AI-generated: `ai-glute-bridges-hip-osteoarthritis-guide.webp` |
| gout-medication-uk | AI-generated: `ai-gout-medication-uk.webp` |
| gp-home-visit-arthritis-frailty-uk | AI-generated: `ai-gp-home-visit-arthritis-frailty-uk.webp` |
| grab-rails-arthritis-frailty-home-uk | AI-generated: `ai-grab-rails-arthritis-frailty-home-uk.webp` |
| grip-strength-exercises-hand-oa | AI-generated: `ai-grip-strength-exercises-hand-oa.webp` |
| gut-joint-connection-microbiome-arthritis | AI-generated: `ai-gut-joint-connection-microbiome-arthritis.webp` |
| hand-exercises-for-arthritis | AI-generated: `ai-hand-exercises-for-arthritis.webp` |
| hand-osteoarthritis-frailty-dressing-cooking-uk | AI-generated: `ai-hand-osteoarthritis-frailty-dressing-cooking-uk.webp` |
| heat-packs-frail-arthritis-uk | AI-generated: `ai-heat-packs-frail-arthritis-uk.webp` |
| high-rise-flat-arthritis-frailty-lifts-uk | AI-generated: `ai-high-rise-flat-arthritis-frailty-lifts-uk.webp` |
| hip-and-knee-oa-frailty-transfers-uk | AI-generated: `ai-hip-and-knee-oa-frailty-transfers-uk.webp` |
| hip-arthritis-symptoms-uk | AI-generated: `ai-hip-arthritis-symptoms-uk.webp` |
| hip-oa-frailty-bed-mobility-uk | AI-generated: `ai-hip-oa-frailty-bed-mobility-uk.webp` |
| hip-pain-climbing-stairs-causes-relief | AI-generated: `ai-hip-pain-climbing-stairs-causes-relief.webp` |
| hip-replacement-arthritis-uk | AI-generated: `ai-hip-replacement-arthritis-uk.webp` |
| hobbies-arthritis-friendly-uk | AI-generated: `ai-hobbies-arthritis-friendly-uk.webp` |
| hoist-conversations-family-carers-uk | AI-generated: `ai-hoist-conversations-family-carers-uk.webp` |
| holiday-at-home-arthritis-frailty-uk | AI-generated: `ai-holiday-at-home-arthritis-frailty-uk.webp` |
| hospital-appointments-frailty-arthritis-uk | AI-generated: `ai-hospital-appointments-frailty-arthritis-uk.webp` |
| hospital-deconditioning-arthritis-stay-uk | AI-generated: `ai-hospital-deconditioning-arthritis-stay-uk.webp` |
| hospital-parking-walking-frail-arthritis-uk | AI-generated: `ai-hospital-parking-walking-frail-arthritis-uk.webp` |
| hospital-stay-arthritis-frailty-what-to-pack-uk | AI-generated: `ai-hospital-stay-arthritis-frailty-what-to-pack-uk.webp` |
| hotel-rooms-accessibility-arthritis | AI-generated: `ai-hotel-rooms-accessibility-arthritis.webp` |
| inflammatory-arthritis-frailty-flare-week-uk | AI-generated: `ai-inflammatory-arthritis-frailty-flare-week-uk.webp` |
| inflammatory-arthritis-guide | AI-generated: `ai-inflammatory-arthritis-guide.webp` |
| intermediate-care-arthritis-frailty-uk | AI-generated: `ai-intermediate-care-arthritis-frailty-uk.webp` |
| jak-inhibitors-the-next-wave-of-ra-treatment | AI-generated: `ai-jak-inhibitors-the-next-wave-of-ra-treatment.webp` |
| joint-fusion-vs-replacement-how-surgeons-choose | AI-generated: `ai-joint-fusion-vs-replacement-how-surgeons-choose.webp` |
| joint-replacement-decision-frailty-uk | AI-generated: `ai-joint-replacement-decision-frailty-uk.webp` |
| joint-replacement-surgery | AI-generated: `ai-joint-replacement-surgery.webp` |
| juvenile-arthritis-school-support-parents | AI-generated: `ai-juvenile-arthritis-school-support-parents.webp` |
| juvenile-arthritis-uk | AI-generated: `ai-juvenile-arthritis-uk.webp` |
| kettle-safety-arthritis-frailty-uk | AI-generated: `ai-kettle-safety-arthritis-frailty-uk.webp` |
| kitchen-adaptations-arthritis-frailty-uk | AI-generated: `ai-kitchen-adaptations-arthritis-frailty-uk.webp` |
| knee-arthritis-exercises-uk | AI-generated: `ai-knee-arthritis-exercises-uk.webp` |
| knee-arthroscopy-for-osteoarthritis-helpful-or-hype | AI-generated: `ai-knee-arthroscopy-for-osteoarthritis-helpful-or-hype.webp` |
| knee-oa-frailty-outdoor-pavements-uk | AI-generated: `ai-knee-oa-frailty-outdoor-pavements-uk.webp` |
| knee-oa-frailty-rising-from-low-sofa-uk | AI-generated: `ai-knee-oa-frailty-rising-from-low-sofa-uk.webp` |
| knee-osteoarthritis-frailty-staying-steady-home-uk | AI-generated: `ai-knee-osteoarthritis-frailty-staying-steady-home-uk.webp` |
| knee-replacement-arthritis-uk | AI-generated: `ai-knee-replacement-arthritis-uk.webp` |
| libraries-arthritis-frailty-getting-out-uk | AI-generated: `ai-libraries-arthritis-frailty-getting-out-uk.webp` |
| local-wheelchair-service-arthritis-uk | AI-generated: `ai-local-wheelchair-service-arthritis-uk.webp` |
| longevity-habits-arthritis-patients | AI-generated: `ai-longevity-habits-arthritis-patients.webp` |
| lower-back-stiffness-worse-after-sitting | AI-generated: `ai-lower-back-stiffness-worse-after-sitting.webp` |
| lymphoedema-arthritis-frailty-uk | AI-generated: `ai-lymphoedema-arthritis-frailty-uk.webp` |
| manage-arthritis-pain-flare-ups-night | AI-generated: `ai-manage-arthritis-pain-flare-ups-night.webp` |
| managing-arthritis-at-work | AI-generated: `ai-managing-arthritis-at-work.webp` |
| meal-delivery-arthritis-frailty-uk | AI-generated: `ai-meal-delivery-arthritis-frailty-uk.webp` |
| medication-management-travel-arthritis | AI-generated: `ai-medication-management-travel-arthritis.webp` |
| methotrexate-older-frail-adults-uk | AI-generated: `ai-methotrexate-older-frail-adults-uk.webp` |
| midfoot-osteoarthritis-frailty-standing-time-uk | AI-generated: `ai-midfoot-osteoarthritis-frailty-standing-time-uk.webp` |
| mindfulness-chronic-pain-arthritis-guide | AI-generated: `ai-mindfulness-chronic-pain-arthritis-guide.webp` |
| mindfulness-pain-arthritis-frailty-uk | AI-generated: `ai-mindfulness-pain-arthritis-frailty-uk.webp` |
| mobility-scooter-arthritis-frailty-uk | AI-generated: `ai-mobility-scooter-arthritis-frailty-uk.webp` |
| morning-routine-multi-joint-arthritis | AI-generated: `ai-morning-routine-multi-joint-arthritis.webp` |
| morning-stiffness-frailty-routine-uk | AI-generated: `ai-morning-stiffness-frailty-routine-uk.webp` |
| neck-osteoarthritis-frailty-balance-looking-down-uk | AI-generated: `ai-neck-osteoarthritis-frailty-balance-looking-down-uk.webp` |
| nhs-access-to-biologics-how-the-approval-pathway-works | AI-generated: `ai-nhs-access-to-biologics-how-the-approval-pathway-works.webp` |
| nhs-frailty-pathway-arthritis-england | AI-generated: `ai-nhs-frailty-pathway-arthritis-england.webp` |
| nhs-rheumatologist-northern-ireland | AI-generated: `ai-nhs-rheumatologist-northern-ireland.webp` |
| night-lights-arthritis-falls-frailty-uk | AI-generated: `ai-night-lights-arthritis-falls-frailty-uk.webp` |
| nordic-poles-arthritis-frailty-uk | AI-generated: `ai-nordic-poles-arthritis-frailty-uk.webp` |
| nsaids-and-arthritis-benefits-risks-and-safer-use | AI-generated: `ai-nsaids-and-arthritis-benefits-risks-and-safer-use.webp` |
| nursing-home-arthritis-pain-review-uk | AI-generated: `ai-nursing-home-arthritis-pain-review-uk.webp` |
| nutrition-strategies-reduce-frailty-risk | AI-generated: `ai-nutrition-strategies-reduce-frailty-risk.webp` |
| oa-vs-ra-comparison | AI-generated: `ai-oa-vs-ra-comparison.webp` |
| occupational-therapist-kitchen-visit-frailty-uk | AI-generated: `ai-occupational-therapist-kitchen-visit-frailty-uk.webp` |
| older-adults-arthritis-frailty-northern-ireland-uk | AI-generated: `ai-older-adults-arthritis-frailty-northern-ireland-uk.webp` |
| osteoarthritis-symptoms-uk | AI-generated: `ai-osteoarthritis-symptoms-uk.webp` |
| ot-assessment-arthritis-frailty-uk | AI-generated: `ai-ot-assessment-arthritis-frailty-uk.webp` |
| outdoor-steps-handrails-arthritis-uk | AI-generated: `ai-outdoor-steps-handrails-arthritis-uk.webp` |
| pacing-housework-arthritis-frailty-uk | AI-generated: `ai-pacing-housework-arthritis-frailty-uk.webp` |
| pacing-visitors-arthritis-frailty-uk | AI-generated: `ai-pacing-visitors-arthritis-frailty-uk.webp` |
| packing-list-arthritis-traveller | AI-generated: `ai-packing-list-arthritis-traveller.webp` |
| paracetamol-for-arthritis-pain-what-the-evidence-says | AI-generated: `ai-paracetamol-for-arthritis-pain-what-the-evidence-says.webp` |
| paramedic-fall-lift-arthritis-uk | AI-generated: `ai-paramedic-fall-lift-arthritis-uk.webp` |
| parenting-with-arthritis-hacks-for-babies-and-toddlers | AI-generated: `ai-parenting-with-arthritis-hacks-for-babies-and-toddlers.webp` |
| pendant-alarm-arthritis-swollen-fingers-uk | AI-generated: `ai-pendant-alarm-arthritis-swollen-fingers-uk.webp` |
| pendulum-swings-wall-slides-shoulder | AI-generated: `ai-pendulum-swings-wall-slides-shoulder.webp` |
| pets-arthritis-frailty-walking-dogs-uk | AI-generated: `ai-pets-arthritis-frailty-walking-dogs-uk.webp` |
| physiotherapy-arthritis | AI-generated: `ai-physiotherapy-arthritis.webp` |
| physiotherapy-home-visit-frail-oa-uk | AI-generated: `ai-physiotherapy-home-visit-frail-oa-uk.webp` |
| pip-arthritis-frailty-honest-uk | AI-generated: `ai-pip-arthritis-frailty-honest-uk.webp` |
| pip-fibromyalgia-denied-reapply | AI-generated: `ai-pip-fibromyalgia-denied-reapply.webp` |
| pip-for-arthritis-how-to-build-a-strong-application | AI-generated: `ai-pip-for-arthritis-how-to-build-a-strong-application.webp` |
| pip-for-arthritis-uk | AI-generated: `ai-pip-for-arthritis-uk.webp` |
| pip-osteoarthritis-both-knees | AI-generated: `ai-pip-osteoarthritis-both-knees.webp` |
| podiatry-footcare-arthritis-frailty-uk | AI-generated: `ai-podiatry-footcare-arthritis-frailty-uk.webp` |
| podiatry-nails-diabetes-arthritis-uk | AI-generated: `ai-podiatry-nails-diabetes-arthritis-uk.webp` |
| polyarticular-oa-frailty-pacing-several-joints-uk | AI-generated: `ai-polyarticular-oa-frailty-pacing-several-joints-uk.webp` |
| polypharmacy-arthritis-frailty-review-uk | AI-generated: `ai-polypharmacy-arthritis-frailty-review-uk.webp` |
| post-hip-replacement-frailty-home-uk | AI-generated: `ai-post-hip-replacement-frailty-home-uk.webp` |
| post-knee-replacement-frailty-rehab-uk | AI-generated: `ai-post-knee-replacement-frailty-rehab-uk.webp` |
| post-op-constipation-arthritis-frailty-uk | AI-generated: `ai-post-op-constipation-arthritis-frailty-uk.webp` |
| prescription-costs-and-arthritis-nhs-prepayment-certificates | AI-generated: `ai-prescription-costs-and-arthritis-nhs-prepayment-certificates.webp` |
| pressure-cushion-arthritis-frailty-uk | AI-generated: `ai-pressure-cushion-arthritis-frailty-uk.webp` |
| preventing-falls-guide-frail-adults | AI-generated: `ai-preventing-falls-guide-frail-adults.webp` |
| preventing-knee-osteoarthritis-uk | AI-generated: `ai-preventing-knee-osteoarthritis-uk.webp` |
| private-rheumatology-in-the-uk-when-its-worth-considering | AI-generated: `ai-private-rheumatology-in-the-uk-when-its-worth-considering.webp` |
| ra-fatigue-frailty-energy-envelope-uk | AI-generated: `ai-ra-fatigue-frailty-energy-envelope-uk.webp` |
| ra-frailty-older-adults-daily-rhythm-uk | AI-generated: `ai-ra-frailty-older-adults-daily-rhythm-uk.webp` |
| ra-steroids-frailty-infection-watch-uk | AI-generated: `ai-ra-steroids-frailty-infection-watch-uk.webp` |
| reablement-after-discharge-arthritis-uk | AI-generated: `ai-reablement-after-discharge-arthritis-uk.webp` |
| reasonable-adjustments-that-actually-help | AI-generated: `ai-reasonable-adjustments-that-actually-help.webp` |
| remote-gp-apps-arthritis-frailty-uk | AI-generated: `ai-remote-gp-apps-arthritis-frailty-uk.webp` |
| repeat-prescriptions-arthritis-frailty-uk | AI-generated: `ai-repeat-prescriptions-arthritis-frailty-uk.webp` |
| resistance-bands-seated-frail-oa-uk | AI-generated: `ai-resistance-bands-seated-frail-oa-uk.webp` |
| resistance-training-arthritis-longevity | AI-generated: `ai-resistance-training-arthritis-longevity.webp` |
| restless-nights-joint-pain-frailty-uk | AI-generated: `ai-restless-nights-joint-pain-frailty-uk.webp` |
| rheumatology-clinic-frail-older-adult-uk | AI-generated: `ai-rheumatology-clinic-frail-older-adult-uk.webp` |
| rheumatology-waiting-times-uk | AI-generated: `ai-rheumatology-waiting-times-uk.webp` |
| rise-recline-chair-arthritis-frailty-uk | AI-generated: `ai-rise-recline-chair-arthritis-frailty-uk.webp` |
| rural-living-arthritis-frailty-uk | AI-generated: `ai-rural-living-arthritis-frailty-uk.webp` |
| seasonal-affective-disorder-arthritis | AI-generated: `ai-seasonal-affective-disorder-arthritis.webp` |
| seasonal-arthritis-guide-uk | AI-generated: `ai-seasonal-arthritis-guide-uk.webp` |
| shingles-vaccine-arthritis-frailty-uk | AI-generated: `ai-shingles-vaccine-arthritis-frailty-uk.webp` |
| shopping-online-arthritis-frailty-uk | AI-generated: `ai-shopping-online-arthritis-frailty-uk.webp` |
| short-term-equipment-loans-arthritis-uk | AI-generated: `ai-short-term-equipment-loans-arthritis-uk.webp` |
| should-you-tell-your-employer-about-your-arthritis | AI-generated: `ai-should-you-tell-your-employer-about-your-arthritis.webp` |
| shoulder-arthroscopy-and-arthritis-what-it-can-and-cant-fix | AI-generated: `ai-shoulder-arthroscopy-and-arthritis-what-it-can-and-cant-fix.webp` |
| shoulder-osteoarthritis-frailty-washing-dressing-uk | AI-generated: `ai-shoulder-osteoarthritis-frailty-washing-dressing-uk.webp` |
| shoulder-pain-reaching-ra-vs-oa | AI-generated: `ai-shoulder-pain-reaching-ra-vs-oa.webp` |
| signs-rheumatoid-arthritis-early-stages | AI-generated: `ai-signs-rheumatoid-arthritis-early-stages.webp` |
| sit-to-stand-practice-frail-arthritis-uk | AI-generated: `ai-sit-to-stand-practice-frail-arthritis-uk.webp` |
| sleeping-tablets-falls-arthritis-frailty-uk | AI-generated: `ai-sleeping-tablets-falls-arthritis-frailty-uk.webp` |
| slow-walking-groups-arthritis-frailty-uk | AI-generated: `ai-slow-walking-groups-arthritis-frailty-uk.webp` |
| smart-speakers-arthritis-frailty-uk | AI-generated: `ai-smart-speakers-arthritis-frailty-uk.webp` |
| social-care-needs-assessment-arthritis-uk | AI-generated: `ai-social-care-needs-assessment-arthritis-uk.webp` |
| social-prescribing-arthritis-frailty-uk | AI-generated: `ai-social-prescribing-arthritis-frailty-uk.webp` |
| speech-swallowing-meals-arthritis-frailty-uk | AI-generated: `ai-speech-swallowing-meals-arthritis-frailty-uk.webp` |
| spinal-arthritis-back-pain-uk | AI-generated: `ai-spinal-arthritis-back-pain-uk.webp` |
| spine-oa-frailty-gardening-pacing-uk | AI-generated: `ai-spine-oa-frailty-gardening-pacing-uk.webp` |
| spiritual-care-arthritis-frailty-uk | AI-generated: `ai-spiritual-care-arthritis-frailty-uk.webp` |
| splints-night-hand-oa-frailty-uk | AI-generated: `ai-splints-night-hand-oa-frailty-uk.webp` |
| stair-assessments-arthritis-frailty-uk | AI-generated: `ai-stair-assessments-arthritis-frailty-uk.webp` |
| stairlifts-arthritis-frailty-uk-home | AI-generated: `ai-stairlifts-arthritis-frailty-uk-home.webp` |
| static-bike-frail-osteoarthritis-uk | AI-generated: `ai-static-bike-frail-osteoarthritis-uk.webp` |
| staying-active-arthritis-winter-uk | AI-generated: `ai-staying-active-arthritis-winter-uk.webp` |
| steroid-emergency-card-frail-arthritis-uk | AI-generated: `ai-steroid-emergency-card-frail-arthritis-uk.webp` |
| steroid-injections-vs-oral-steroids-when-each-makes-sense | AI-generated: `ai-steroid-injections-vs-oral-steroids-when-each-makes-sense.webp` |
| stopping-arthritis-medication-safely-a-step-by-step-guide | AI-generated: `ai-stopping-arthritis-medication-safely-a-step-by-step-guide.webp` |
| straight-leg-raises-knee-osteoarthritis | AI-generated: `ai-straight-leg-raises-knee-osteoarthritis.webp` |
| strength-training-on-biologics-is-it-safe | AI-generated: `ai-strength-training-on-biologics-is-it-safe.webp` |
| support-friend-diagnosed-lupus | AI-generated: `ai-support-friend-diagnosed-lupus.webp` |
| supporting-a-partner-with-arthritis-a-practical-handbook | AI-generated: `ai-supporting-a-partner-with-arthritis-a-practical-handbook.webp` |
| swelling-legs-arthritis-frailty-uk | AI-generated: `ai-swelling-legs-arthritis-frailty-uk.webp` |
| tai-chi-balance-arthritis-frailty-uk | AI-generated: `ai-tai-chi-balance-arthritis-frailty-uk.webp` |
| tai-chi-for-arthritis-uk | AI-generated: `ai-tai-chi-for-arthritis-uk.webp` |
| talk-employer-rheumatoid-arthritis-work | AI-generated: `ai-talk-employer-rheumatoid-arthritis-work.webp` |
| tapering-biologics-what-the-latest-trials-show | AI-generated: `ai-tapering-biologics-what-the-latest-trials-show.webp` |
| tens-machine-older-frail-arthritis-uk | AI-generated: `ai-tens-machine-older-frail-arthritis-uk.webp` |
| tens-machines-arthritis-uk | AI-generated: `ai-tens-machines-arthritis-uk.webp` |
| thumb-base-osteoarthritis-frailty-daily-grip-uk | AI-generated: `ai-thumb-base-osteoarthritis-frailty-daily-grip-uk.webp` |
| thumb-base-pain-early-hand-arthritis | AI-generated: `ai-thumb-base-pain-early-hand-arthritis.webp` |
| toilet-frame-arthritis-frailty-uk | AI-generated: `ai-toilet-frame-arthritis-frailty-uk.webp` |
| topical-nsaids-often-overlooked-often-effective | AI-generated: `ai-topical-nsaids-often-overlooked-often-effective.webp` |
| total-knee-replacement-a-uk-patients-guide-for-2026 | AI-generated: `ai-total-knee-replacement-a-uk-patients-guide-for-2026.webp` |
| transfer-board-arthritis-frailty-uk | AI-generated: `ai-transfer-board-arthritis-frailty-uk.webp` |
| universal-credit-and-arthritis-limited-capability-for-work | AI-generated: `ai-universal-credit-and-arthritis-limited-capability-for-work.webp` |
| university-with-arthritis-disability-support-and-dsa | AI-generated: `ai-university-with-arthritis-disability-support-and-dsa.webp` |
| uti-confusion-arthritis-frailty-uk | AI-generated: `ai-uti-confusion-arthritis-frailty-uk.webp` |
| vision-falls-arthritis-frailty-uk | AI-generated: `ai-vision-falls-arthritis-frailty-uk.webp` |
| volunteering-seated-arthritis-frailty-uk | AI-generated: `ai-volunteering-seated-arthritis-frailty-uk.webp` |
| walking-30-minutes-a-day-while-on-dmards-a-practical-plan | AI-generated: `ai-walking-30-minutes-a-day-while-on-dmards-a-practical-plan.webp` |
| walking-sport-too-much-frail-arthritis-uk | AI-generated: `ai-walking-sport-too-much-frail-arthritis-uk.webp` |
| what-sustained-remission-means-in-ra | AI-generated: `ai-what-sustained-remission-means-in-ra.webp` |
| wheelchair-for-distance-arthritis-frailty-uk | AI-generated: `ai-wheelchair-for-distance-arthritis-frailty-uk.webp` |
| why-exercise-makes-your-arthritis-medication-work-better | AI-generated: `ai-why-exercise-makes-your-arthritis-medication-work-better.webp` |
| winter-arthritis-frailty-cold-houses-uk | AI-generated: `ai-winter-arthritis-frailty-cold-houses-uk.webp` |
| wrist-hand-oa-frailty-self-care-uk | AI-generated: `ai-wrist-hand-oa-frailty-self-care-uk.webp` |
| yoga-ankylosing-spondylitis-stiffness | AI-generated: `ai-yoga-ankylosing-spondylitis-stiffness.webp` |

Posts still on the placeholder:


### Internal links
- Added a short "Related reading" line (1 to 3 links to closely related posts, matched on title and keywords) before the second section heading of 326 posts, 601 links in total. Existing text and medical content were not changed.

### Call to action
- New `src/components/blog/PostSupportCTA.tsx`, shown after the sources on every post: "You don't have to manage arthritis alone" with links to `/arthritis-support`, `/contact` and `/donate`.

### Link check
- Internal: every `/blog/` link resolves to a published post. Two links pointed at redirects and now go to the canonical page: `/finances` became `/benefits-pip` and `/exercise-hub` became `/exercises` (15 posts).
- External: 454 unique URLs checked. Two were dead (404) and were replaced:
  - `nhsinform.scot/waiting-times/outpatient-waiting-times/` became `https://www.nhsinform.scot/waiting-times/`
  - `gov.uk/government/publications/nhs-entitlements-migrant-health-guide` became `https://www.gov.uk/guidance/nhs-entitlements-migrant-health-guide`
- 14 URLs (BNF and CKS at NICE, CSP, RCOA, Relate and others) returned 403 to the automated checker. These sites block bots, so the links were kept.
