// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {matchesData: [], isLoading: true}

  componentDidMount() {
    this.getTeamsMatches()
  }

  getTeamsMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()
    const updatedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatchDetails: {
        id: fetchedData.latest_match_details.id,
        competingTeam: fetchedData.latest_match_details.competing_team,
        competingTeamLogo: fetchedData.latest_match_details.competing_team_logo,
        date: fetchedData.latest_match_details.date,
        firstInnings: fetchedData.latest_match_details.first_innings,
        manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
        matchStatus: fetchedData.latest_match_details.match_status,
        result: fetchedData.latest_match_details.result,
        secondInnings: fetchedData.latest_match_details.second_innings,
        umpires: fetchedData.latest_match_details.umpires,
        venue: fetchedData.latest_match_details.venue,
      },
      recentMatches: fetchedData.recent_matches.map(recentMatche => ({
        umpires: recentMatche.umpires,
        result: recentMatche.result,
        manOfTheMatche: recentMatche.man_of_the_match,
        id: recentMatche.id,
        date: recentMatche.date,
        venue: recentMatche.venue,
        competingTeam: recentMatche.competing_team,
        competingTeamLogo: recentMatche.competing_team_logo,
        firstInnings: recentMatche.first_innings,
        secondInnings: recentMatche.second_innings,
        matchStatus: recentMatche.match_status,
      })),
    }
    this.setState({matchesData: updatedData, isLoading: false})
  }

  renderTeamMathes = () => {
    const {matchesData} = this.state
    const {teamBannerUrl, latestMatchDetails} = matchesData
    return (
      <div className="team-matches-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch LatestMatch={latestMatchDetails} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderRecentMatchesList = () => {
    const {matchesData} = this.state
    const {recentMatches} = matchesData
    return (
      <ul className="recent-matches-list">
        {recentMatches.map(each => (
          <MatchCard matchData={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className={`app-team-matches-container ${id}`}>
        {isLoading ? this.renderLoader() : this.renderTeamMathes()}
      </div>
    )
  }
}

export default TeamMatches
