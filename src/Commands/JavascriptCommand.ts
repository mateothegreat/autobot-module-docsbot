import { Event }       from '@autobot/common';
import { DocsCommand } from './DocsCommand';

export class JavascriptCommand extends DocsCommand {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '!js',
            group: 'docs',
            roles: [

                process.env.DOCSBOT_ADMIN_ROLE_NAME

            ],
            description: '!js <search term>'

        });

        this.name = 'javascript';

    }

}
