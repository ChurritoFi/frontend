import { ValidatorGroup } from "../../lib/types";
import LinkIcon from "../icons/link";
import LocationIcon from "../icons/location";
import MailIcon from "../icons/mail";
import TwitterIcon from "../icons/twitter";
import DiscordIcon from "../icons/discord";
import CopyIcon from "../icons/copy";
import ProfileBadge from "../icons/profile-claimed";

function hasProfile(vg: ValidatorGroup) {
  return (
    vg.email || vg.geographic_location || vg.twitter_username || vg.discord_tag
  );
}

export default function ProfileHeader({ vg }: { vg: ValidatorGroup }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-2xl font-medium text-gray-dark">
            {vg.name ? vg.name : "Unkown Group"}
          </h3>
          {hasProfile(vg) && <ProfileBadge />}
        </div>
        <div className="text-lg text-gray">
          {vg.website_url && (
            <a
              className="inline-flex items-center"
              href={`https://${vg.website_url}`}
              target="_blank"
            >
              <LinkIcon />
              <span className="ml-2">{vg.website_url}</span>
            </a>
          )}
          {vg.geographic_location && (
            <a
              className="inline-flex items-center ml-10"
              href={vg.geographic_location}
              target="_blank"
            >
              <LocationIcon />
              <span className="ml-2">vg Location</span>
            </a>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between text-gray text-lg mt-5">
        <p className="inline-flex items-center">
          <span className="mr-3">{vg.address}</span>
          <button onClick={() => navigator.clipboard.writeText(vg.address)}>
            <CopyIcon size="lg" />
          </button>
        </p>
        <div>
          {vg.email && (
            <a
              className="inline-flex items-center ml-10"
              href={`mailto:${vg.email}`}
              target="_blank"
            >
              <MailIcon />
              <span className="ml-2">{vg.email}</span>
            </a>
          )}
          {vg.twitter_username && (
            <a
              className="inline-flex items-center ml-10"
              href={`https://twitter.com/${vg.twitter_username}`}
              target="_blank"
            >
              <TwitterIcon />
              <span className="ml-2">{vg.twitter_username}</span>
            </a>
          )}
          {vg.discord_tag && (
            <p className="inline-flex items-center ml-10">
              <DiscordIcon />
              <span className="ml-2">{vg.discord_tag}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
