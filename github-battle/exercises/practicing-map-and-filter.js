class Users extends React.Component {
  render() {
    return (
      <ul>
        {this.props.list.map(name => <li>{name}</li>)}
      </ul>
    )
  }
}

ReactDOM.render(
  <Users list={['Tyler', 'Mikenzi', 'Ryan', 'Michael']} />,
  document.getElementById('app')
);

class Users extends React.Component {
  render() {
		var friends = this.props.list.filter(user => user.friend)

		var nonFriends = this.props.list.filter(user => !user.friend)

    return (
      <div>
        <h1>Friends</h1>
        <ul>
          {friends.map(friend => <li key={friend.name}>{friend.name}</li>)}
        </ul>

        <hr />

        <h1> Non Friends </h1>
        <ul>
          {nonFriends.map(friend => <li key={friend.name}>{friend.name}</li>)}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(
  <Users list={[
    { name: 'Tyler', friend: true },
    { name: 'Ryan', friend: true },
    { name: 'Michael', friend: false },
    { name: 'Mikenzi', friend: false },
    { name: 'Jessica', friend: true },
    { name: 'Dan', friend: false } ]}
  />,
  document.getElementById('app')
);
