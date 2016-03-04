import * as React from 'react';
import Content from './Content';
import NavigationBar from './NavigationBar';
import ParentProperties from './properties/ParentProperties';

interface AppProperties extends ParentProperties<any, any> {
}

class App extends React.Component<AppProperties, void>{
    render() {
        console.log(this.props.children);
        return (
            <section className="main">
              <NavigationBar/>
              <Content>
                {this.props.children}
              </Content>
            </section>
        );
    }
}

export default App;
