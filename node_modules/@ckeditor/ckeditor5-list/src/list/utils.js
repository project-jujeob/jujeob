/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ButtonView } from 'ckeditor5/src/ui.js';
/**
 * Helper method for creating a UI button and linking it with an appropriate command.
 *
 * @internal
 * @param editor The editor instance to which the UI component will be added.
 * @param commandName The name of the command.
 * @param label The button label.
 * @param icon The source of the icon.
 */
export function createUIComponent(editor, commandName, label, icon) {
    editor.ui.componentFactory.add(commandName, locale => {
        const command = editor.commands.get(commandName);
        const buttonView = new ButtonView(locale);
        buttonView.set({
            label,
            icon,
            tooltip: true,
            isToggleable: true
        });
        // Bind button model to command.
        buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');
        // Execute command.
        buttonView.on('execute', () => {
            editor.execute(commandName);
            editor.editing.view.focus();
        });
        return buttonView;
    });
}
