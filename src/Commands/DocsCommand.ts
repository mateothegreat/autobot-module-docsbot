import { Command, CommandBase, CommandParser, Event } from '@autobot/common';
import { RichEmbed }                                  from 'discord.js';
import { Doc }                                        from '../_lib/Doc';
import { JSONUtil }                                   from '../_lib/JSONUtil';

const h2m = require('h2m');

/**
 *
 */
@Command
export class DocsCommand extends CommandBase {

    public static readonly PAGE_LENGTH: number = Number(process.env.DOCSBOT_LIMIT_CHARS);

    public static getEmbed(doc: Doc, page: number): RichEmbed {

        return new RichEmbed().setTitle(`devdocs: "${ doc.key }"`)
                              .setColor(3447003)
                              .addField('devdocs.io url', `https://devdocs.io/javascript/${ doc.key }`)
                              .setDescription(h2m(doc.doc).substr(DocsCommand.PAGE_LENGTH * page, DocsCommand.PAGE_LENGTH));

    }

    public static async addReactions(message: any) {

        // @ts-ignore
        await message.clearReactions();

        // @ts-ignore
        await message.react('🗑');
        // @ts-ignore
        await message.react('⏪');
        // @ts-ignore
        await message.react('⏩');
        // @ts-ignore

    }

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '#',
            group: 'docs',
            roles: [

                process.env.DOCSBOT_ADMIN_ROLE_NAME

            ],
            description: '#js <search term>'

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

        console.log(command);

        const result = JSONUtil.getByName('javascript', command.arguments[ 0 ].name);

        if (result) {

            const message = await command.obj.channel.send(DocsCommand.getEmbed(result, currentPage));

            const filter = (reaction: any, user: any) => {

                // @ts-ignore
                return [ '🗑', '⏪', '⏩' ].includes(reaction.emoji.name);

            };

            DocsCommand.addReactions(message);

            // @ts-ignore
            let collector = message.createReactionCollector(filter, { time: 999999 });

            // @ts-ignore
            collector.on('collect', async (reaction, collector) => {

                console.log(reaction);

                if (reaction.users.size === 2 && reaction.me) {

                    if (reaction.emoji.name === '⏩') {

                        currentPage++;
                        reaction.message.edit(DocsCommand.getEmbed(result, currentPage));

                        DocsCommand.addReactions(message);

                    } else if (reaction.emoji.name === '⏪') {

                        if (currentPage > 0) {

                            currentPage--;
                            reaction.message.edit(DocsCommand.getEmbed(result, currentPage));

                            DocsCommand.addReactions(message);

                        }

                    } else if (reaction.emoji.name === '🗑') {

                        reaction.message.delete();

                    }

                }

            });

        } else {

            command.obj.channel.send(new RichEmbed().setTitle('devdocs')
                                                    .setColor(3447003)
                                                    .setDescription(`Could not find any results for "${ command.arguments[ 0 ].name }`));

        }

    }

}
