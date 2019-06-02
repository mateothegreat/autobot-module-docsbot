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

            const message = await command.obj.channel.send(new RichEmbed().setTitle(`devdocs: "${ command.arguments[ 0 ].name }"`)
                                                                          .setColor(3447003)
                                                                          .setDescription(h2m(doc.substr(0, 1000)) + '...'));
            // @ts-ignore
            message.react('🗑');
            // @ts-ignore
            message.react(':arrow_backward:');
            // @ts-ignore
            message.react(':arrow_forward:').react(':link');

            const filter = (reaction: any, user: any) => {

                // @ts-ignore
                return [ '🗑', ':arrow_backward:', ':arrow_forward:' ].includes(reaction.emoji.name);

            };

            // @ts-ignore
            message.awaitReactions(filter, { max: 1, time: 60000, errors: [ 'time' ] })

                   // @ts-ignore
                   .then(collected => {

                       console.log(collected);

                       const reaction = collected.first();

                       if (reaction.emoji.name === '🗑') {
                           // @ts-ignore
                           message.reply('delete');

                       } else {
                           // @ts-ignore
                           message.reply('you reacted with a thumbs down.');

                       }

                   })
                   // @ts-ignore
                   .catch(collected => {
                       console.log(`After a minute, only ${ collected.size } out of 4 reacted.`);
                       // @ts-ignore
                       message.reply('you didn\'t react with neither a thumbs up, nor a thumbs down.');
                   });

        } else {

            command.obj.channel.send(new RichEmbed().setTitle('devdocs')
                                                    .setColor(3447003)
                                                    .setDescription(`Could not find any results for "${ command.arguments[ 0 ].name }`));

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
