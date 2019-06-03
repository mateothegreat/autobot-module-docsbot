import { Command, CommandBase, CommandParser, Event } from '@autobot/common';
import axios                                          from 'axios';
import { RichEmbed }                                  from 'discord.js';

/**
 * Pings cheat.sh
 */
@Command
export class CheatShCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '#cheat',
            group: 'docs',
            roles: [

                process.env.DOCSBOT_ADMIN_ROLE_NAME

            ],
            description: 'Pings cheat.sh'

        });

    }

    /**
     * Called when a command matches config.name.
     *
     * @param command Parsed out commamd
     *
     */
    public async run(command: CommandParser) {

        const result = await axios(`https://cheat.sh/${ command.arguments[ 0 ].name }`);

        if (result.data) {

            command.obj.channel.send(new RichEmbed().setTitle('cheat.sh')
                                                    .setColor(3447003)
                                                    .setDescription("```md\n" + result.data.substring(0, 1000) + "```")
                                                    .setURL(`https://cheat.sh/${ command.arguments[ 0 ].name }`));

        } else {

            command.obj.channel.send(new RichEmbed().setTitle('cheat.sh')
                                                    .setColor(3447003)
                                                    .setDescription(`Could not find any results for "${ command.arguments[ 0 ].name }`));

        }

    }

}
