import React from 'react';
import { Grid } from 'antd-mobile';

class AvatarSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			avatar: ''
		}
	}

	render() {
		const avatars = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
			.split(',')
			.map((avatar) => ({
				icon: require(`../img/${avatar}.png`),
				text: avatar
			}));
		return (
			<div>
				<div>
				{
					this.state.avatar ?
						<div>
							<figure>
								<img src={require(`../img/${this.state.avatar}.png`)} alt={this.state.avatar}/>
								<span>{this.state.avatar}</span>
							</figure>
						</div> :
						<div>
							<figure>
								<img src={require(`../img/avatar.png`)} alt="avatar" />
								<span>Please select image.</span>
							</figure>
						</div>
				}
				</div>
				<Grid data={avatars} columnNum={5}
							onClick={(el) => {
								this.setState({avatar: el.text});
								this.props.selectAvatar(el)}
							}
				/>
			</div>
		);
	}
}
					
export default AvatarSelector;