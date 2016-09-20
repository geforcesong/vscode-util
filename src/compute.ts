import * as vscode from 'vscode';

export class Compute {
    static compute() {
        let textEditor = vscode.window.activeTextEditor;
        let startLine = 0;
        let endLine = textEditor.document.lineCount-1;
        let total = 0;
        let numbers = [];
        for (var i = startLine; i <=endLine; i++) {
            var v = parseFloat(textEditor.document.lineAt(i).text);
            if (!isNaN(v)){
                total += v;
                numbers.push(v);
            }
        }
        let avg = (total/numbers.length).toFixed(2);
        textEditor.edit((builder) => {
            var range = new vscode.Range(startLine, 0, endLine, textEditor.document.lineAt(endLine).text.length);
            var content = numbers.join("\n");
            content += "\n";
            content += `Total is: ${total}. Average is: ${avg}`
            builder.replace(range, content);
        });
    }
}