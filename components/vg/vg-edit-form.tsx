import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import * as Fathom from "fathom-client";
import { toast } from "react-toastify";

import { ValidatorGroup, VgEditFormType } from "../../lib/types";
import useVgMutation from "../../hooks/useVgMutation";

const FormSchema = yup.object().shape({
  email: yup.string().email(),
  geoURL: yup.string().url(),
  twitter: yup.string(),
  discord: yup.string(),
});

export default function VgEditForm({
  vg,
  setVg,
  send,
  setTwitterOpen,
}: {
  vg: ValidatorGroup;
  setVg: React.Dispatch<React.SetStateAction<ValidatorGroup | undefined>>;
  send: any;
  setTwitterOpen: any;
}) {
  // GraphQL Mutation
  const { updateVg } = useVgMutation();

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VgEditFormType>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      email: vg.email ?? undefined,
      geoURL: vg.geographic_location ?? undefined,
      discord: vg.discord_tag ?? undefined,
      twitter: vg.twitter_username ?? undefined,
    },
  });

  const onFormSubmit = (data: VgEditFormType) => {
    const formData = Object.fromEntries(
      Object.entries(data).filter((entry) => entry[1].length > 0)
    );

    const variables = { id: vg.id, ...formData };
    console.log(variables);

    console.log("starting update");
    send("NEXT");

    updateVg(variables)
      .then(async (res) => {
        if (res.error) {
          const e = res.error.message;
          toast.error(e.charAt(10).toUpperCase() + e.slice(11));
          send("ERROR");
          return;
        }
        const vgData = res.data?.UpdateVgSocialInfo;
        console.log(vgData);
        setVg({
          ...vg,
          discord_tag: vgData?.DiscordTag,
          email: vgData?.Email,
          twitter_username: vgData?.TwitterUsername,
          geographic_location: vgData?.GeographicLocation ?? "",
        });

        console.log("vg UPDATED");

        send("NEXT");
        toast.success("Group details updated.");
        window.beam("/_custom-events/validator-group-details-updated");
        Fathom.trackGoal("H0U4OOXH", 0);

        console.log("update complete");
        setTwitterOpen();
      })
      .catch((err) => send("ERROR"));
  };

  return (
    <div className="mt-10 border border-gray-light rounded-md p-10 text-gray-dark">
      <h3 className="text-xl font-medium">Edit Your Profile</h3>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="grid grid-cols-2 mt-5 gap-x-10 gap-y-3">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-dark"
            >
              Your email
            </label>
            <div className="mt-2">
              <input
                {...register("email")}
                type="email"
                id="email"
                className={`${
                  errors?.email
                    ? "border-alert bg-alert-light-light"
                    : "border-gray bg-gray-light-light"
                } border-2  rounded-md shadow-sm text-lg block w-full`}
                placeholder="eg. something@gmail.com"
              />
            </div>
            <p className="mt-1 text-sm h-6 w-full text-alert">
              {errors?.email ? errors.email.message : ""}
            </p>
          </div>
          <div>
            <label
              htmlFor="geoLocation"
              className="block text-sm font-medium text-gray-dark"
            >
              Your Location
            </label>
            <div className="mt-2">
              <input
                {...register("geoURL")}
                type="text"
                id="geoLocation"
                className={`${
                  errors?.geoURL
                    ? "border-alert bg-alert-light-light"
                    : "border-gray bg-gray-light-light"
                } border-2  rounded-md shadow-sm text-lg block w-full`}
                placeholder="Google Map URL of your City"
              />
            </div>
            <p className="mt-1 text-sm h-6 w-full text-alert">
              {errors?.geoURL && errors.geoURL.message}
            </p>
          </div>
          <div>
            <label
              htmlFor="twitter"
              className="block text-sm font-medium text-gray-dark"
            >
              Twitter Handle
            </label>
            <div className="mt-2">
              <input
                {...register("twitter")}
                type="text"
                id="twitter"
                className={`${
                  errors?.twitter
                    ? "border-alert bg-alert-light-light"
                    : "border-gray bg-gray-light-light"
                } border-2  rounded-md shadow-sm text-lg block w-full`}
                placeholder="eg. @CeloOrg"
              />
            </div>
            <p className="mt-1 text-sm h-6 w-full text-alert">
              {errors?.twitter && errors.twitter.message}
            </p>
          </div>
          <div>
            <label
              htmlFor="discord"
              className="block text-sm font-medium text-gray-dark"
            >
              Discord tag
            </label>
            <div className="mt-2">
              <input
                {...register("discord")}
                type="text"
                id="discord"
                className={`${
                  errors?.discord
                    ? "border-alert bg-alert-light-light"
                    : "border-gray bg-gray-light-light"
                } border-2  rounded-md shadow-sm text-lg block w-full`}
                placeholder="eg. manan#1170"
              />
            </div>
            <p className="mt-1 text-sm h-6 w-full text-alert">
              {errors?.discord && errors.discord.message}
            </p>
          </div>
        </div>
        <button className="mt-4 bg-primary py-3 px-12 rounded-md text-white text-lg font-medium shadow-sm">
          Save
        </button>
      </form>
    </div>
  );
}
