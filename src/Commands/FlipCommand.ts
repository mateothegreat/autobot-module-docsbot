import { Command, CommandBase, CommandParser, Event } from '@autobot/common';

/**
 *
 */
@Command
export class FlipCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '!flip',
            group: 'fun',
            description: 'Flips for a value between "|"s'

        });

    }

    /**
     * Called when a command matches config.name.
     *
     * @param command Parsed out commamd
     *
     */
    public async run(command: CommandParser) {

        const split = command.arguments[ 0 ];

        console.log(split);

        console.log(command.arguments);
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
