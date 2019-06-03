import { Event }       from '@autobot/common';
import { DocsCommand } from './DocsCommand';

export class KotlinCommand extends DocsCommand {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '!kt',
            group: 'docs',
            roles: [

                process.env.DOCSBOT_ADMIN_ROLE_NAME

            ],
            description: '!kt <search term>'

        });

        this.name = 'kotlin';

    }

}
