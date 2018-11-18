import React, { Component } from 'react';
import { getDecks } from '../services/deckService';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { getCurrentUser } from '../services/userService';
import { saveCard } from '../services/cardService';

class CardForm extends Component {
  state = {
    data: { front: '', back: '', _deck: '', _creator: getCurrentUser()._id },
    decks: [],
  };

  async populateDecks() {
    const { data: decks } = await getDecks();
    const data = { ...this.state.data };
    data._deck = decks[0]._id;
    this.setState({ decks, data });
  }

  async componentDidMount() {
    await this.populateDecks();
  }

  handleChange = (value, name) => {
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data });
  };

  handleSaveCard = async card => {
    const data = { ...this.state.data };
    data.front = '';
    data.back = '';
    this.setState({ data });

    const { data: result } = await saveCard(card);
    console.log(result);
  };

  render() {
    const { data, decks } = this.state;

    return (
      <div>
        <h1>New Card</h1>
        <FormControl variant="outlined">
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="deck"
          >
            Deck
          </InputLabel>
          <Select
            value={data._deck}
            onChange={e => this.handleChange(e.target.value, '_deck')}
            input={<OutlinedInput labelWidth={35} name="deck" id="deck" />}
          >
            {decks.map(deck => (
              <MenuItem key={deck._id} value={deck._id}>
                {deck.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <form>
          <TextField
            onChange={e => this.handleChange(e.target.value, 'front')}
            value={data.front}
            label="Front"
            name="front"
            multiline
            rows="4"
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            onChange={e => this.handleChange(e.target.value, 'back')}
            value={data.back}
            label="Back"
            name="back"
            multiline
            rows="4"
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleSaveCard(data)}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default CardForm;
