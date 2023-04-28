import _ from 'lodash';
import React from 'react';


function Basic(props) {
	const obj = { Human: { a: [1, 2, 3], b: [3, 4], c: [2, 3] } };
	const values = _.values(obj.Human);
	console.log(values);

	return <></>
}

export default Basic