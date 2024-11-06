import PropTypes from "prop-types";

const moveShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

const memberShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  is_shiny: PropTypes.bool,
  item: PropTypes.string,
  ability: PropTypes.string.isRequired,
  moves: PropTypes.arrayOf(moveShape).isRequired,
});

export const TeamShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(memberShape).isRequired,
  user_OT: PropTypes.string.isRequired,
});

export const UserPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  pfp: PropTypes.string.isRequired,
  teams: PropTypes.arrayOf(TeamShape).isRequired,
});

export const EntryPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});
