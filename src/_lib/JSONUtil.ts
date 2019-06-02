export class JSONUtil {

    public static JSON = require('../../db.json');

    public static getByName(name: string): string {

        for (let key in JSONUtil.JSON) {

            console.log(key);

            const split = key.split('/');

            if (split[ split.length - 1 ] == name) {

                return JSONUtil.JSON[ key ];

            }

        }

    }

}
