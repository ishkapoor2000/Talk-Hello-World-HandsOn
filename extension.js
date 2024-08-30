const vscode = require('vscode');
const { createClient } = require('@supabase/supabase-js');

function activate(context) {
    const SUPABASE_URL = 'https://ovdibwrrpuxsdzfqfeft.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92ZGlid3JycHV4c2R6ZnFmZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ5NjkwNTQsImV4cCI6MjA0MDU0NTA1NH0.TgW1xWBGdlFhqa400rl3HSmxPVBonUpgsQYFVpcVITs';
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
