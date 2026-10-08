"use client";

import React, { useState } from "react";
import { Switch } from "@/components/shared/Switch";

export const NotificationSettings: React.FC = () => {
  // Master Push Notification State
  const [pushNotifications, setPushNotifications] = useState(true);

  // Sub-items for Push Notifications
  const [serviceRequestUpdates, setServiceRequestUpdates] = useState(true);
  const [estimateUpdates, setEstimateUpdates] = useState(true);
  const [appointmentUpdates, setAppointmentUpdates] = useState(true);
  const [contractsUpdates, setContractsUpdates] = useState(true);
  const [paymentUpdates, setPaymentUpdates] = useState(true);

  // Email & SMS Notifications
  const [emailNotification, setEmailNotification] = useState(true);
  const [smsNotification, setSmsNotification] = useState(true);

  return (
    <div className="bg-card-bg rounded-sm border border-border p-5 sm:p-7 md:p-8 shadow-2xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Heading & Description matching Figma Screenshot 1 */}
        <div className="lg:col-span-4 space-y-1">
          <h4 className="text-base md:text-lg font-medium text-txt-primary">
            Notifications
          </h4>
          <p className="text-sm md:text-base text-secondary-subheading font-normal">
            Control notifications for receiving important updates and sent to
            customer and crew.
          </p>
        </div>

        {/* Right Column: Notification Controls */}
        <div className="lg:col-span-8 space-y-6">
          {/* Master Item: Push Notifications */}
          <div className="flex items-center justify-between gap-4 pb-1">
            <div>
              <h5 className="text-sm sm:text-base font-semibold text-primary-heading">
                Push Notifications
              </h5>
              <p className="text-xs sm:text-sm text-secondary-subheading font-normal mt-0.5">
                Receive updates on your device
              </p>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
              aria-label="Push notifications toggle"
            />
          </div>

          {/* Nested Group Container with Border matching Figma Screenshot 1 */}
          <div className="border border-border/80 rounded-md p-4 sm:p-5 divide-y divide-border/60 bg-card-bg space-y-4">
            {/* 1. Service request updates */}
            <div className="flex items-center justify-between gap-4 pt-0">
              <div>
                <h6 className="text-xs sm:text-sm font-semibold text-primary-heading">
                  Service request updates
                </h6>
                <p className="text-[11px] sm:text-xs text-secondary-subheading font-normal mt-0.5">
                  Get notified when your service request is accepted, declined,
                  or cancelled.
                </p>
              </div>
              <Switch
                checked={serviceRequestUpdates}
                onCheckedChange={setServiceRequestUpdates}
                disabled={!pushNotifications}
                aria-label="Service request updates toggle"
              />
            </div>

            {/* 2. Estimate / Offer Updates */}
            <div className="flex items-center justify-between gap-4 pt-4">
              <div>
                <h6 className="text-xs sm:text-sm font-semibold text-primary-heading">
                  Estimate / Offer Updates
                </h6>
                <p className="text-[11px] sm:text-xs text-secondary-subheading font-normal mt-0.5">
                  Get notified when you receive any estimate or when your offer
                  request changes.
                </p>
              </div>
              <Switch
                checked={estimateUpdates}
                onCheckedChange={setEstimateUpdates}
                disabled={!pushNotifications}
                aria-label="Estimate updates toggle"
              />
            </div>

            {/* 3. Appointment Updates */}
            <div className="flex items-center justify-between gap-4 pt-4">
              <div>
                <h6 className="text-xs sm:text-sm font-semibold text-primary-heading">
                  Appointment Updates
                </h6>
                <p className="text-[11px] sm:text-xs text-secondary-subheading font-normal mt-0.5">
                  Get notified about appointment confirmations, changes,
                  cancellations.
                </p>
              </div>
              <Switch
                checked={appointmentUpdates}
                onCheckedChange={setAppointmentUpdates}
                disabled={!pushNotifications}
                aria-label="Appointment updates toggle"
              />
            </div>

            {/* 4. Contracts & Agreements Updates */}
            <div className="flex items-center justify-between gap-4 pt-4">
              <div>
                <h6 className="text-xs sm:text-sm font-semibold text-primary-heading">
                  Contracts & Agreements Updates
                </h6>
                <p className="text-[11px] sm:text-xs text-secondary-subheading font-normal mt-0.5">
                  Get notified when a new contracts & agreements has been sent
                  to you.
                </p>
              </div>
              <Switch
                checked={contractsUpdates}
                onCheckedChange={setContractsUpdates}
                disabled={!pushNotifications}
                aria-label="Contracts updates toggle"
              />
            </div>

            {/* 5. Payment Updates */}
            <div className="flex items-center justify-between gap-4 pt-4">
              <div>
                <h6 className="text-xs sm:text-sm font-semibold text-primary-heading">
                  Payment Updates
                </h6>
                <p className="text-[11px] sm:text-xs text-secondary-subheading font-normal mt-0.5">
                  Get notified about payment reminders, due payments, monthly
                  billing.
                </p>
              </div>
              <Switch
                checked={paymentUpdates}
                onCheckedChange={setPaymentUpdates}
                disabled={!pushNotifications}
                aria-label="Payment updates toggle"
              />
            </div>
          </div>

          {/* Email Notification matching Figma Screenshot 1 */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <div>
              <h5 className="text-sm sm:text-base font-semibold text-primary-heading">
                Email Notification
              </h5>
              <p className="text-xs sm:text-sm text-secondary-subheading font-normal mt-0.5">
                Receive updates on your registered email.
              </p>
            </div>
            <Switch
              checked={emailNotification}
              onCheckedChange={setEmailNotification}
              aria-label="Email notification toggle"
            />
          </div>

          {/* Text/Sms Notification matching Figma Screenshot 1 */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <div>
              <h5 className="text-sm sm:text-base font-semibold text-primary-heading">
                Text/Sms Notifiction
              </h5>
              <p className="text-xs sm:text-sm text-secondary-subheading font-normal mt-0.5">
                Receive updates on your registered number.
              </p>
            </div>
            <Switch
              checked={smsNotification}
              onCheckedChange={setSmsNotification}
              aria-label="SMS notification toggle"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
