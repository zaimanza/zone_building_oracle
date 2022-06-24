var router = require('express').Router()
const { fetchLatestTransaction, updateSingleAsset } = require('../../database/bigchaindb.database')
const { Assets, Transactions } = require('../../database/mongodb.database')
const { createZone } = require('../../modules/zone.module')
const user_wallet = require('../../utils/user_wallet.json')


// api/products
router.post('/add_building', async (req, res) => {
    try {
        const assetsModel = await Assets()
        const transactionsModel = await Transactions()

        var assetAppend

        const props = req.body

        if (!props?.name ||
            !props?.zone_asset_id ||
            !props?.tile_map ||
            !props?.tilesets
        )
            return res.status(400).json("Unauthorized")

        // if dont exist create
        assetAppend = await createZone({
            asset: {
                type: "building"
            },
            metadata: {
                zone_asset_id: props?.zone_asset_id,
                name: props?.name,
                tile_map: props?.tile_map,
                tilesets: props?.tilesets
            },
            publicKey: user_wallet?.publicKey,
            privateKey: user_wallet?.privateKey
        })

        if (JSON.stringify(assetAppend) != JSON.stringify({})) {
            return res.status(200).json(assetAppend)
        } else {
            return res.status(200).json("false")
        }
    } catch (error) {
        return res.status(400).json("Server error")
    }
})

module.exports = router;


