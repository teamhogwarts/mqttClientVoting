import React, { Component } from 'react';
import { Row, Container } from 'reactstrap';
import Counter from './Counter';
import Mqtt from 'mqtt';

let client;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yes: 0,
            no: 0
        }
    }

    componentDidMount() {
        // environment variable must be started with "REACT_APP_"
        const SERVER_URL = process.env.REACT_APP_MQTT_SERVER_URL;
        const USERNAME = process.env.REACT_APP_USERNAME;
        const PASSWORD = process.env.REACT_APP_PASSWORD;
        console.log("using server '%s'", SERVER_URL);
        client = Mqtt.connect('mqtt://' + SERVER_URL, {
            username: USERNAME,
            password: PASSWORD,
            clientId: 'mqttclient_' + Math.random()
        });

        client.on('connect', function () {
            console.log('connected');
            client.subscribe('voting');
        });

        client.on('message', this.actualize);
    }

    componentWillUnmount() {
        client.end(true);
    }

    actualize = (topic, message) => {
        console.log("message received over topic '%s'", topic);
        let response = JSON.parse(message);
        this.setState({
            yes: response.yes,
            no: response.no
        })
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Counter background="#c7e5ae" counter={this.state.yes} header="yes" />
                    <Counter background="#e5aeae" counter={this.state.no} header="no" />
                </Row>
            </Container>
        );
    }
}

export default App;