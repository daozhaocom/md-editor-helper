// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

function init() {
	vscode.workspace.getConfiguration().update("markdown.styles", [ "https://socialsimulation.net/css/post.min.css"], vscode.ConfigurationTarget.Workspace).then(() => {
		vscode.window.showInformationMessage('Ready md-editor-helper!');
	});
}
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	vscode.window.showInformationMessage('md-editor-helper is now active!');

	init();

	// const configuredView = vscode.workspace.getConfiguration().get('conf.view.showOnWindowOpen');
	// console.log('configuredView', configuredView);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('md-editor-helper.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from md-editor-helper!');
		init();
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
