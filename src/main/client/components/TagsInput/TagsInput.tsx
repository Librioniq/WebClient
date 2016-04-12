import * as React from 'react';

interface TagsInputProps {
    tags?: string[];
    onTagsChange?: (tags: string[]) => void;
}

interface TagsInputState {
    tags: string[];
    content: string;
}

export class TagsInput extends React.Component<TagsInputProps, TagsInputState> {
    public componentWillMount() {
        const { tags } = this.props;

        this.state = { tags: tags || [], content: "" };
    }

    public render() {
        const { tags, content } = this.state;

        return (
            <div>
                <div className="input-group">
                    { tags.map(it => (<span className = { "input-group-addon" }>{ it }</span>)) }
                    <input
                        type = { "text" }
                        value = { content }
                        className = { "form-control" }
                        onKeyDown = { e => this.onKeyDown(e) }
                        onChange = { e => this.onInputChange((e.currentTarget as HTMLInputElement).value) }
                        aria-label = { "Tags" }
                        />
                </div>
            </div>
        );
    }

    private onKeyDown(e: React.KeyboardEvent) {
        const { tags, content } = this.state;
        const key = e.keyCode || e.charCode;

        if ((key === 8 || key === 46) && !content.length) {
            this.setState({ tags: tags.slice(0, tags.length - 1), content: tags[tags.length - 1] });

            e.preventDefault();
        }
    }

    private onInputChange(content: string) {
        const { tags } = this.state;

        if (/[a-z0-9\+#-.]+[,|\s|;]/ig.test(content)) {
            this.setState({ tags: [...tags, content.trim()], content: "" });
            this.props.onTagsChange(this.state.tags);
        } else {
            this.setState({ tags, content });
        }
    }
}

export default TagsInput;
