import PropTypes from "prop-types";

export const MemberShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  is_shiny: PropTypes.bool.isRequired,
  item: PropTypes.string,
  ability: PropTypes.string.isRequired,
  moves: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const TeamShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(MemberShape).isRequired,
  user_OT: PropTypes.string.isRequired,
});

export const EntryPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});
