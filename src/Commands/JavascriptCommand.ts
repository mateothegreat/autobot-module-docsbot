import { Command, CommandBase, CommandParser, Event } from '@autobot/common';
import { RichEmbed }                                  from 'discord.js';
import { Doc }                                        from '../_lib/Doc';
import { JSONUtil }                                   from '../_lib/JSONUtil';

const h2m = require('h2m');

/**
 *
 */
@Command
export class JavascriptCommand extends CommandBase {

    public static readonly PAGE_LENGTH: number = Number(process.env.DOCSBOT_LIMIT_CHARS);

    public static getEmbed(doc: Doc, page: number): RichEmbed {

        return new RichEmbed().setTitle(`devdocs: "${ doc.key }"`)
                              .setColor(3447003)
                              .addField('devdocs.io url', `https://devdocs.io/javascript/${ doc.key }`)
                              .setDescription(h2m(doc.doc).substr(JavascriptCommand.PAGE_LENGTH * page, JavascriptCommand.PAGE_LENGTH));

    }

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

    }

    /**
     * Called when a command matches config.name.
     *
     * @param command Parsed out commamd
     *
     */
    public async run(command: CommandParser) {

        let currentPage: number = 0;

        const result = JSONUtil.getByName('javascript', command.arguments[ 0 ].name);

        if (result) {

            const message = await command.obj.channel.send(JavascriptCommand.getEmbed(result, currentPage));

            const filter = (reaction: any, user: any) => {

                // @ts-ignore
                return [ '🗑', '⏪', '⏩' ].includes(reaction.emoji.name);

            };

            // @ts-ignore
            const emojiTrash = await message.react('🗑');
            // @ts-ignore
            const emojiPrevious = await message.react('⏪');
            // @ts-ignore
            const emojiNext = await message.react('⏩');
            // @ts-ignore

            let collector = message.createReactionCollector(filter, { time: 105000 });

            // @ts-ignore
            collector.on('collect', async (reaction, collector) => {

                console.log(reaction);

                if (reaction.users.size === 2 && reaction.me) {

                    // @ts-ignore
                    await message.clearReactions();

                    if (reaction.emoji.name === '⏩') {

                        currentPage++;
                        reaction.message.edit(JavascriptCommand.getEmbed(result, currentPage));

                        // await reaction.remove();

                        // @ts-ignore

                        // @ts-ignore
                        await message.react('⏩');

                    } else if (reaction.emoji.name === '⏪') {

                        if (currentPage > 0) {

                            currentPage--;
                            reaction.message.edit(JavascriptCommand.getEmbed(result, currentPage));

                            await reaction.remove();

                            // @ts-ignore
                            await message.react('⏪');

                        }

                    } else if (reaction.emoji.name === '🗑') {

                        reaction.message.delete();

                    }

                }

            });

            // }, 3000);

            // @ts-ignore
            // collector.on('end', collected => {
            //
            //     console.log(`collected ${ collected.size } reactions`);
            //
            // });

        } else {

            command.obj.channel.send(new RichEmbed().setTitle('devdocs')
                                                    .setColor(3447003)
                                                    .setDescription(`Could not find any results for "${ command.arguments[ 0 ].name }`));

        }

    }

}
