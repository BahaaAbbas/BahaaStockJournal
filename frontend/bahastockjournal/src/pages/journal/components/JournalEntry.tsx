import JournalDateTable from "./JournalDateTable"
import JournalHeader from "./JournalHeader"
import JournalInsertTemplate from "./JournalInsertTemplate"


type JournalEntryProps = {
    date: string;

};

const JournalEntry = ({ date }: JournalEntryProps) => {

    return (
        <div className="bgS-LD rounded-md p-3 flex flex-col gap-2">

            {/*custom info */}
            <JournalHeader date={date} />

            {/* textarea-button */}
            <JournalInsertTemplate />

            {/* Table */}
            <JournalDateTable date={date} />
        </div>
    )
}

export default JournalEntry
