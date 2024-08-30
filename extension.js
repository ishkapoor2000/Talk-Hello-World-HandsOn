const vscode = require('vscode');
const { createClient } = require('@supabase/supabase-js');

function activate(context) {
    const SUPABASE_URL = '';
    const SUPABASE_KEY = '';
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    let disposable = vscode.commands.registerCommand('hello-world-supabase-vscode-extension.storeRandomNumber', async function () {
        // Generate a random number
        const randomNumber = Math.floor(Math.random() * 100) + 1;

        // Store the random number in the database
        const { data, error } = await supabase
            .from('random_numbers')
            .insert([{ number: randomNumber }]);

        if (error) {
            vscode.window.showErrorMessage('Error storing the number: ' + error.message);
        } else {
            vscode.window.showInformationMessage('Random number ' + randomNumber + ' stored successfully!');
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
