var express = require('express');
var Coordinates1 = require ('../models/Coordinates');
var router = express.Router();

router.get('/local',(req,res,next)=>{
    res.json({
        route: {
            step: [
                {
                    start_location: {
                        lat: "21.0019937",
                        lng: "105.8521863"
                    },
                    end_location: {
                        lat: "21.0022207",
                        lng: "105.8508119"
                    }
                },
                {
                    start_location: {
                        lat: "21.0022207",
                        lng: "105.8508119"
                    },
                    end_location: {
                        lat: "20.9958565",
                        lng: "105.8499201"
                    }
                },
                {
                    start_location: {
                        lat: "20.9958565",
                        lng: "105.8499201"
                    },
                    end_location: {
                        lat: "20.9972627",
                        lng: "105.8426467"
                    }
                },
                {
                    start_location: {
                        lat: "20.9972627",
                        lng: "105.8426467"
                    },
                    end_location: {
                        lat: "21.0031025",
                        lng: "105.8203995"
                    }
                },
                {
                    start_location: {
                        lat: "21.0031025",
                        lng: "105.8203995"
                    },
                    end_location: {
                        lat: "21.0154221",
                        lng: "105.8050682"
                    }
                },
                {
                    start_location: {
                        lat: "21.0154221",
                        lng: "105.8050682"
                    },
                    end_location: {
                        lat: "21.0134991",
                        lng: "105.8026049"
                    }
                },
                {
                    start_location: {
                        lat: "21.0134991",
                        lng: "105.8026049"
                    },
                    end_location: {
                        lat: "21.0231891",
                        lng: "105.7901765"
                    }
                },
                {
                    start_location: {
                        lat: "21.0231891",
                        lng: "105.7901765"
                    },
                    end_location: {
                        lat: "21.0272930",
                        lng: "105.7877501"
                    }
                }
                // {
                //     start_location: {
                //         lat: "21.0272930",
                //         lng: "105.7877501"
                //     },
                //     end_location: {
                //         lat: "21.0265990",
                //         lng: "105.7866829"
                //     }
                // }
            ]
        }
    })
});

router.post('/local', async (req,res)=>{
    console.log(req.body);
    await new Coordinates1({
        start_lat : req.body.Local.start_location[0].lat,
        start_lng : req.body.Local.start_location[0].lng,
        end_lat : req.body.Local.end_location[0].lat,
        end_lng : req.body.Local.end_location[0].lng,
    }).save()
    .then(doc=>{
        res.json({
            route: {
                step: [
                    {
                        start_location: {
                            lat: "21.0019937",
                            lng: "105.8521863"
                        },
                        end_location: {
                            lat: "21.0022207",
                            lng: "105.8508119"
                        }
                    },
                    {
                        start_location: {
                            lat: "21.0022207",
                            lng: "105.8508119"
                        },
                        end_location: {
                            lat: "20.9958565",
                            lng: "105.8499201"
                        }
                    },
                    {
                        start_location: {
                            lat: "20.9958565",
                            lng: "105.8499201"
                        },
                        end_location: {
                            lat: "20.9972627",
                            lng: "105.8426467"
                        }
                    },
                    {
                        start_location: {
                            lat: "20.9972627",
                            lng: "105.8426467"
                        },
                        end_location: {
                            lat: "21.0031025",
                            lng: "105.8203995"
                        }
                    },
                    {
                        start_location: {
                            lat: "21.0031025",
                            lng: "105.8203995"
                        },
                        end_location: {
                            lat: "21.0154221",
                            lng: "105.8050682"
                        }
                    },
                    {
                        start_location: {
                            lat: "21.0154221",
                            lng: "105.8050682"
                        },
                        end_location: {
                            lat: "21.0134991",
                            lng: "105.8026049"
                        }
                    },
                    {
                        start_location: {
                            lat: "21.0134991",
                            lng: "105.8026049"
                        },
                        end_location: {
                            lat: "21.0231891",
                            lng: "105.7901765"
                        }
                    },
                    {
                        start_location: {
                            lat: "21.0231891",
                            lng: "105.7901765"
                        },
                        end_location: {
                            lat: "21.0272930",
                            lng: "105.7877501"
                        }
                    },
                    {
                        start_location: {
                            lat: "21.0272930",
                            lng: "105.7877501"
                        },
                        end_location: {
                            lat: "21.0265990",
                            lng: "105.7866829"
                        }
                    }
                ]
            }
        });
    })
    .catch(err=>{
        res.json(err);
    })
});

router.get('/maytram',(req,res)=>{
    res.json({title: "tim cach post di"});
    // const _arr = service.get(() =>  []);
    // res.json(_arr)
})

router.post('/maytram',async (req,res)=>{
    console.log(req.body);
    ///
    res.json(req.body)
})

module.exports= router;