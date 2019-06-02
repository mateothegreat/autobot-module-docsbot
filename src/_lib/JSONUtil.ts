import { Doc } from './Doc';

export class JSONUtil {

    public static getByName(name: string): Doc {

        if (name.match(/^[a-z0-9-]+$/i)) {

            const json = require(`${ process.env.DOCSBOT_SAVE_PATH }/${ name }.json`);

            for (let key in json) {

                const split = key.split('/');

                if (split[ split.length - 1 ] == name) {

                    return {

                        key,
                        name,
                        doc: json[ key ]

                    };

                }

            }

        }

    }

}
