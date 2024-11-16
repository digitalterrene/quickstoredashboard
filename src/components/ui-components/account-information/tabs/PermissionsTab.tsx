import { Switch } from "@headlessui/react";
import React, { useState } from "react";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export default function PermissionsTab() {
  const [availableToHire, setAvailableToHire] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [allowCommenting, setAllowCommenting] = useState(true);
  const [allowMentions, setAllowMentions] = useState(true);

  return (
    <div>
      {/* Privacy section */}
      <div className="pt-6 divide-y divide-gray-200">
        <div className="px-4 sm:px-6">
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Privacy
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Ornare eu a volutpat eget vulputate. Fringilla commodo amet.
            </p>
          </div>
          <ul role="list" className="mt-2 divide-y divide-gray-200">
            <Switch.Group
              as="li"
              className="py-4 flex items-center justify-between"
            >
              <div className="flex flex-col">
                <Switch.Label
                  as="p"
                  className="text-sm font-medium text-gray-900"
                  passive
                >
                  Available to hire
                </Switch.Label>
                <Switch.Description className="text-sm text-gray-500">
                  Nulla amet tempus sit accumsan. Aliquet turpis sed sit
                  lacinia.
                </Switch.Description>
              </div>
              <Switch
                checked={availableToHire}
                onChange={setAvailableToHire}
                className={classNames(
                  availableToHire ? "bg-teal-500" : "bg-gray-200",
                  "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    availableToHire ? "translate-x-5" : "translate-x-0",
                    "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  )}
                />
              </Switch>
            </Switch.Group>
            <Switch.Group
              as="li"
              className="py-4 flex items-center justify-between"
            >
              <div className="flex flex-col">
                <Switch.Label
                  as="p"
                  className="text-sm font-medium text-gray-900"
                  passive
                >
                  Make account private
                </Switch.Label>
                <Switch.Description className="text-sm text-gray-500">
                  Pharetra morbi dui mi mattis tellus sollicitudin cursus
                  pharetra.
                </Switch.Description>
              </div>
              <Switch
                checked={privateAccount}
                onChange={setPrivateAccount}
                className={classNames(
                  privateAccount ? "bg-teal-500" : "bg-gray-200",
                  "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    privateAccount ? "translate-x-5" : "translate-x-0",
                    "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  )}
                />
              </Switch>
            </Switch.Group>
            <Switch.Group
              as="li"
              className="py-4 flex items-center justify-between"
            >
              <div className="flex flex-col">
                <Switch.Label
                  as="p"
                  className="text-sm font-medium text-gray-900"
                  passive
                >
                  Allow commenting
                </Switch.Label>
                <Switch.Description className="text-sm text-gray-500">
                  Integer amet, nunc hendrerit adipiscing nam. Elementum ame
                </Switch.Description>
              </div>
              <Switch
                checked={allowCommenting}
                onChange={setAllowCommenting}
                className={classNames(
                  allowCommenting ? "bg-teal-500" : "bg-gray-200",
                  "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    allowCommenting ? "translate-x-5" : "translate-x-0",
                    "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  )}
                />
              </Switch>
            </Switch.Group>
            <Switch.Group
              as="li"
              className="py-4 flex items-center justify-between"
            >
              <div className="flex flex-col">
                <Switch.Label
                  as="p"
                  className="text-sm font-medium text-gray-900"
                  passive
                >
                  Allow mentions
                </Switch.Label>
                <Switch.Description className="text-sm text-gray-500">
                  Adipiscing est venenatis enim molestie commodo eu gravid
                </Switch.Description>
              </div>
              <Switch
                checked={allowMentions}
                onChange={setAllowMentions}
                className={classNames(
                  allowMentions ? "bg-teal-500" : "bg-gray-200",
                  "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    allowMentions ? "translate-x-5" : "translate-x-0",
                    "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  )}
                />
              </Switch>
            </Switch.Group>
          </ul>
        </div>
        <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
          <button
            type="button"
            className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
