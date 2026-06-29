import metricsRepository from "../repositories/metricsRepository.js";

async function getMetrics(req, res) {

    try {

        const metrics =
            await metricsRepository.getMetrics();

        const hitRate =
            metrics.total_requests === 0

                ? 0

                : (

                    metrics.cache_hits

                    /

                    metrics.total_requests

                ) * 100;

        res.json({

            success: true,

            metrics: {

                ...metrics,

                hit_rate:
                    hitRate.toFixed(2) + "%"

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

}

export default {

    getMetrics,

};