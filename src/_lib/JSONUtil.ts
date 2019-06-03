import { Doc } from './Doc';

export class JSONUtil {

    public static getByName(filename: string, name: string): Doc {

        if (filename.match(/^[a-z0-9-]+$/i)) {

            const json = require(`${ process.env.DOCSBOT_SAVE_PATH }/${ filename }.json`);

            for (let key in json) {

                const split = key.split(/[\/.]/);

                let pages: number = 0;

                console.log(split[ split.length - 1 ].length, split[ split.length - 1 ].length / Number(process.env.DOCSBOT_LIMIT_CHARS));

                if (split[ split.length - 1 ].length / Number(process.env.DOCSBOT_LIMIT_CHARS) > 0) {

                    pages = Math.ceil(split[ split.length - 1 ].length / Number(process.env.DOCSBOT_LIMIT_CHARS));

                } else {

                    pages = 0;

                }

                if (split[ split.length - 1 ] == name) {

                    return {

                        key,
                        name,
                        doc: json[ key ],
                        pages

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
