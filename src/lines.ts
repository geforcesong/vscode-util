import * as vscode from 'vscode';

export class Lines {
    static sort(sortAlgorithm?: (a:string, b:string)=> any) : void {
        let textEditor = vscode.window.activeTextEditor;
        let selection = Lines.getSelection(textEditor);
        if (!selection || selection.isSingleLine)
            return;
        let lines = [];
        let startLine = selection.start.line;
        let endLine = selection.end.line;
        for (let i = startLine; i <= endLine; i++) {
            var text = textEditor.document.lineAt(i).text;
            lines.push(text);
        }
        lines.sort(sortAlgorithm);
        textEditor.edit((builder) => {
            var range = new vscode.Range(startLine, 0, endLine, textEditor.document.lineAt(endLine).text.length);
            builder.replace(range, lines.join("\n"));
        });
    }

    static sortDesc() {
        let compare = (a:string, b:string) : any =>{
            if (a > b)
                return -1;
            else if (a == b)
                return 0;
            else
                return 1;
        }
        Lines.sort(compare);
    }

    static trimLines(removeDuplicate?: boolean) {
        let textEditor = vscode.window.activeTextEditor;
        let selection = Lines.getSelection(textEditor);
        if (!selection || selection.isSingleLine)
            return;
        let lines = [];
        let startLine = selection.start.line;
        let endLine = selection.end.line;
        for (let i = startLine; i <= endLine; i++) {
            var text = textEditor.document.lineAt(i).text;
            if (text) {
                text = text.trim();
            }
            if (text) {
                if (removeDuplicate && lines.indexOf(text) >= 0)
                    continue;
                lines.push(text);
            }
        }
        textEditor.edit((builder) => {
            var range = new vscode.Range(startLine, 0, endLine, textEditor.document.lineAt(endLine).text.length);
            builder.replace(range, lines.join("\n"));
        });
    }

    static removeDuplicate() {
        Lines.trimLines(true)
    }

    private static getSelection(textEditor: vscode.TextEditor) {
        if (!textEditor)
            return null;
        return textEditor.selection;
    }
}
