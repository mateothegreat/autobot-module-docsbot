import { Command, CommandBase, CommandParser, Event } from '@autobot/common';
import { RichEmbed }                                  from 'discord.js';
import { JSONUtil }                                   from '../_lib/JSONUtil';

const h2m = require('h2m');

/**
 *
 */
@Command
export class JavascriptCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '!js',
            group: 'docs',
            description: '!js <search term>'

        });

    }

    /**
     * Called when a command matches config.name.
     *
     * @param command Parsed out commamd
     *
     */
    public async run(command: CommandParser) {

        const doc = JSONUtil.getByName('strict_mode');

        console.log(h2m(doc.substr(0, 1000)));

        if (doc) {

            command.obj.channel.send(new RichEmbed().setTitle(`devdocs: "${ command.arguments[ 0 ].name }"`)
                                                    .setColor(3447003)
                                                    .setDescription(h2m(doc.substr(0, 1000)) + '...'));
        } else {

            command.obj.channel.send(new RichEmbed().setTitle('devdocs')
                                                    .setColor(3447003)
                                                    .setDescription(`Could not find any results for "${ command.arguments[ 0 ].name }`)).then(message => {

                console.log(message);

                // @ts-ignore
                message.react('🗑');
            });

        }

        //
        // const embed = new RichEmbed().setTitle('Flip!')
        //                              .setColor(3447003);
        //
        // results.forEach(row => {
        //
        //     embed.addField(`❯ ${ row.total } points`, `<@${ row.to_userid }>`);
        //
        // });
        //
        // command.obj.channel.send(embed);

    }

}
