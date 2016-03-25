import * as React from 'react';
import * as marked from 'marked';
import * as highlight from 'highlight.js';

interface MarkdownViewerProps {
    content: string;
    className: string;
}

export class MarkdownViewer extends React.Component<MarkdownViewerProps, void> {
    public render() {
        return (
            <section>
                <div className = {this.props.className} dangerouslySetInnerHTML = { { __html: this.transpile(this.props.content) } }/>
            </section>
        );
    }

    private transpile(markdown: string) {
        return marked(markdown, { highlight: code => highlight.highlightAuto(code).value });
    }
}

export default MarkdownViewer;