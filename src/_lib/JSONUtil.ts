import { Doc } from './Doc';

export class JSONUtil {

    public static getByName(filename: string, name: string): Doc {

        if (filename.match(/^[a-z0-9-]+$/i)) {

            const json = require(`${ process.env.DOCSBOT_SAVE_PATH }/${ filename }.json`);

            for (let key in json) {

                console.log(key);

                const split = key.split(/[\/.]/);

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

    public static getTerms(filename: string): Array<string> {

        if (filename.match(/^[a-z0-9-]+$/i)) {

            const terms = [];
            const json = require(`${ process.env.DOCSBOT_SAVE_PATH }/${ filename }.json`);

            for (let key in json) {

                const split = key.split(/[\/.]/);

                if (terms.indexOf(split[ split.length - 1 ]) === -1) {

                    terms.push(split[ split.length - 1 ]);

                }

            }

            return terms;

        }

    }

}
