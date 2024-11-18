import PropTypes from "prop-types";

const MoveShape = PropTypes.string;

export const MemberShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  is_shiny: PropTypes.bool,
  item: PropTypes.string,
  ability: PropTypes.string.isRequired,
  moves: PropTypes.arrayOf(MoveShape).isRequired,
});

export const TeamShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(MemberShape).isRequired,
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
