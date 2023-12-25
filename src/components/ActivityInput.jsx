import { BiLinkExternal } from "react-icons/bi";
import DateInput from "./DateInput";
import FormCheckbox from "./FormCheckbox";
import FormCheckboxWithOnChange from "./FormCheckboxWithOnChange";
import FormInput from "./FormInput";
import FormInputWithOnChange from "./FormInputIWithOnChange";
import FormTextArea from "./FormTextArea";
import FormTimeInput from "./FormTimeInput";
import { useState } from "react";

const ActivityInput = ({
  link,
  date,
  title,
  endTime,
  location,
  startTime,
  description,
  mandatory,
  online,
}) => {
  const [onlineChecked, setOnlineChecked] = useState(online);
  const [llink, setLink] = useState(link);
  return (
    <>
      <FormInput
        label="Judul kegiatan"
        name="title"
        size="input-sm"
        defaultValue={title}
      />
      <FormInput
        label="Tempat / lokasi"
        name="location"
        size="input-sm"
        defaultValue={location}
      />

      <div className="flex justify-evenly">
        <FormTimeInput
          label="Mulai"
          name="startTime"
          defaultValue={startTime}
        />
        <FormTimeInput label="Berakhir" name="endTime" defaultValue={endTime} />
        <DateInput name="date" label="tanggal" defaultValue={date} />
      </div>
      <FormTextArea
        label="Deskripsi"
        name="description"
        size="textarea-sm"
        defaultValue={description}
      />
      <div className="flex justify-evenly">
        <FormCheckbox
          name="mandatory"
          label="Wajib"
          size="checkbox-sm"
          defaultChecked={mandatory}
        />
        <FormCheckboxWithOnChange
          name="online"
          label="Online"
          size="checkbox-sm"
          checked={onlineChecked}
          onChange={() => setOnlineChecked(!onlineChecked)}
        />
      </div>
      {onlineChecked && (
        <div className="flex justify-end">
          <div className="w-11/12">
            <FormInputWithOnChange
              label="link"
              name="link"
              size="input-sm"
              value={llink}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="w-1/12 flex items-end">
            <a
              href={llink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2"
            >
              <BiLinkExternal className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityInput;
