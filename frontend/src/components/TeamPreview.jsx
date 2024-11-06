import { TeamShape } from "../types";

function TeamPreview({ team }) {
  { members, error, loading } = useFetchTeam(team.members);

  return (
    <div className="user-team">
      <h3>{team.name}</h3>
      <ul>
      </ul>
    </div>
  );
}

TeamPreview.propTypes = {
  team: TeamShape.isRequired,
};

export default TeamPreview;
