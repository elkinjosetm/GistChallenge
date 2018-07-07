import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { isEqual, isEmpty, cloneDeep, set, findIndex } from 'lodash';
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
		const currentIndex = findIndex(props.list, [ 'id', props.data.id ]);
		const nextIndex = currentIndex + 1;
		const prevIndex = currentIndex - 1;

		/**
		 * Calculate if there is a
		 * previous gist in the list
		 * and if there is next gist
		 * in the list. Depending on
		 * the active gist
		 */
		const isPrevAvailable = prevIndex > -1;
		const isNextAvailable = nextIndex <= (props.list.length - 1);

		const sections = [ { title : screenStrings.files, data : props.data.filesArray, type : 'files' } ];

		if (!isEmpty(props.comments))
			sections.push({ title : screenStrings.comments, data : props.comments, type : 'comments' });

		this.state = {
			sections,
			isPrevAvailable,
			isNextAvailable,
		};
	}

	static getDerivedStateFromProps = ({ list, data, comments }, prevState) => {
		const screenStrings = Strings.screens.details;
		const newState = cloneDeep(prevState);
		const sections = [ { title : screenStrings.files, data : data.filesArray, type : 'files' } ];
		const currentIndex = findIndex(list, [ 'id', data.id ]);
		const nextIndex = currentIndex + 1;
		const prevIndex = currentIndex - 1;
		const isPrevAvailable = prevIndex > -1;
		const isNextAvailable = nextIndex <= (list.length - 1);

		if (!isEmpty(comments))
			sections.push({ title : screenStrings.comments, data : comments, type : 'comments' });

		if (!isEqual(sections, prevState.sections))
			set(newState, [ 'sections', sections ]);

		if (!isEqual(isPrevAvailable, prevState.isPrevAvailable))
			set(newState, [ 'isPrevAvailable', isPrevAvailable ]);

		if (!isEqual(isNextAvailable, prevState.isNextAvailable))
			set(newState, [ 'isNextAvailable', isNextAvailable ]);

		return newState;
	}

	shouldComponentUpdate = ({ loading }, {
		sections,
		isPrevAvailable,
		isNextAvailable,
	}) => {
		const lastProps = this.props;
		const lastState = this.state;

		return (
			!isEqual(loading, lastProps.loading) ||
			!isEqual(sections, lastState.sections) ||
			!isEqual(isPrevAvailable, lastState.isPrevAvailable) ||
			!isEqual(isNextAvailable, lastState.isNextAvailable)
		);
	}

	onNavigate = direction => () => this.props.dispatch(thunks.loadNearestGist(direction))

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
		const {
			sections,
			isPrevAvailable,
			isNextAvailable,
		} = this.state;

		return (
			<View style={ styles.container }>
				<InnerComponent
					sections={ sections }
					loading={ loading }
					isPrevAvailable={ isPrevAvailable }
					isNextAvailable={ isNextAvailable }
					onRefresh={ this.onRefresh }
					onNavigate={ this.onNavigate }
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ gists : {
	loading : { refreshControl : loading },
	data : {
		details : data,
		list,
		comments,
	},
} }) => ({
	data,
	loading,
	comments,
	list,
});

const mapDispatchToProps = dispatch => ({
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreenContainer);
