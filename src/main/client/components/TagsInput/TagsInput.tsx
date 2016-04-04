import * as React from 'react';

interface TagsInputProps {
    onTagsChange?: (tags: string[]) => void;
}

interface TagsInputState {
    tags: string[];
    content: string;
}

export class TagsInput extends React.Component<TagsInputProps, TagsInputState> {
    public componentWillMount() {
        this.state = { tags: [], content: "" };
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
                        onChange = { e => this.onInputChange((e.currentTarget as HTMLInputElement).value) }
                        aria-label = { "Tags" }
                    />
                </div>
            </div>
        );
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
