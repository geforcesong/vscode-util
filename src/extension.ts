'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {Lines} from './lines';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let commands = [
        vscode.commands.registerCommand('util.sort', Lines.sort),
        vscode.commands.registerCommand('util.sortDesc', Lines.sortDesc),
        vscode.commands.registerCommand('util.trimLines', Lines.trimLines),
        vscode.commands.registerCommand('util.trimAndRemoveDuplicateLines', Lines.removeDuplicate),
    ];
    commands.forEach((cmd)=>{
        context.subscriptions.push(cmd);
    })
}

// this method is called when your extension is deactivated
export function deactivate() {
}