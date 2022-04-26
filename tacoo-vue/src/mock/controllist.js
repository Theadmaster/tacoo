export default {
    getControlList: () => {
        return {
            "data": [
                {
                    "id": 1,
                    "ip": '192.168.1.2',
                    "sendPipe": '/test_topic',
                    "receivePipe": '/test_subscripe',
                    "trafficFlow": 56,
                    "shootInfo": [
                        {
                            "id": 1,
                            "uid": 'ffff29410021ce19',
                            "ip": '192.168.0.98',
                            "orientation": '左'
                        },
                        {
                            "id": 1,
                            "uid": 'ffff29410021adf6',
                            "ip": '192.168.2.98',
                            "orientation": '右'
                        }
                    ]
                },
                {
                    "id": 2,
                    "ip": '192.168.1.1',
                    "sendPipe": '/test_cribe',
                    "receivePipe": '/test_buite',
                    "trafficFlow": 72,
                    "shootInfo": [
                        {
                            "id": 1,
                            "uid": 'ffff29410021ce19',
                            "ip": '192.168.0.98',
                            "orientation": '左'
                        },
                        {
                            "id": 1,
                            "uid": 'ffff29410021adf6',
                            "ip": '192.168.2.98',
                            "orientation": '右'
                        }
                    ]
                },
            ]
        }
    }
}