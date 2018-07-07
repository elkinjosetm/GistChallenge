import Colors from './colors';

export default {
	screen : {
		container : {
			flex : 1,
		},

		shadow : {
			shadowColor   : Colors.black,
			elevation     : 1.5,
			shadowRadius  : 1.5,
			shadowOpacity : 0.08,
			shadowOffset  : {
				width  : 1.5,
				height : 1.5,
			},
		},
	},

	navigation : {
		card : {
			backgroundColor : Colors.mainBackground,
		},
		header : {
			wrapper : {
				backgroundColor   : Colors.primary,
				borderBottomColor : Colors.iron,
			},

			title : {
				color : Colors.white,
			},

			buttonColor : Colors.white,
		},
	},
};
