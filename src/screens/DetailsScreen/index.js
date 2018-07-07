import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { isEqual, isEmpty, cloneDeep, set } from 'lodash';
import { thunks } from '@redux/gists';
import Strings from '@i18n';
import InnerComponent from './index.component';
import styles from './styles';

class DetailsScreenContainer extends Component {
	static navigationOptions = ({ navigation }) => ({
		title : navigation.state.params.title,
	});

	constructor(props) {
		super(props);
		const screenStrings = Strings.screens.details;

		const sections = [ { title : screenStrings.files, data : props.data.filesArray, type : 'files' } ];

		if (!isEmpty(props.comments))
			sections.push({ title : screenStrings.comments, data : props.comments, type : 'comments' });

		this.state = {
			sections,
		};
	}

	static getDerivedStateFromProps = ({ data, comments }, prevState) => {
		const screenStrings = Strings.screens.details;
		const newState = cloneDeep(prevState);
		const sections = [ { title : screenStrings.files, data : data.filesArray, type : 'files' } ];

		if (!isEmpty(comments))
			sections.push({ title : screenStrings.comments, data : comments, type : 'comments' });

		if (!isEqual(sections, prevState.sections))
			set(newState, [ 'sections', sections ]);

		return newState;
	}

	shouldComponentUpdate = ({ loading }, { sections }) => {
		const lastProps = this.props;
		const lastState = this.state;

		return (
			!isEqual(loading, lastProps.loading) ||
			!isEqual(sections, lastState.sections)
		);
	}

	onRefresh = () => {
		const {
			data : { id },
			dispatch,
		} = this.props;

		dispatch(thunks.getGistById(id));
	}

	render() {
		const {
			loading,
		} = this.props;
		const { sections } = this.state;

		return (
			<View style={ styles.container }>
				<InnerComponent
					sections={ sections }
					loading={ loading }
					onRefresh={ this.onRefresh }
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ gists : {
	loading : { refreshControl : loading },
	data : {
		details : data,
		comments,
	},
} }) => ({
	data,
	loading,
	comments,
});

const mapDispatchToProps = dispatch => ({
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreenContainer);
