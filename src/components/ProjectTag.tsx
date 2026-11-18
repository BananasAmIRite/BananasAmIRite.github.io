export enum ProjectTag {
    WORK_IN_PROGRESS = 'WORK_IN_PROGRESS',
    ELECTRONICS = 'ELECTRONICS',
    WEB = 'WEB',
    SIMULATIONS = 'SIMULATIONS',
    CONTROLS = 'CONTROLS',
}

interface TagStyle {
    label: string;
    color: string;
    textColor: string;
}

const TAG_STYLES: Record<ProjectTag, TagStyle> = {
    [ProjectTag.WORK_IN_PROGRESS]: {
        label: 'Work in Progress',
        color: 'var(--bs-warning)',
        textColor: 'var(--bs-gray-900)',
    },
    [ProjectTag.ELECTRONICS]: {
        label: 'Electronics',
        color: 'var(--bs-success)',
        textColor: 'var(--bs-gray-100)',
    },
    [ProjectTag.WEB]: {
        label: 'Web',
        color: 'var(--bs-primary)',
        textColor: 'var(--bs-gray-100)',
    },
    [ProjectTag.SIMULATIONS]: {
        label: 'Simulations',
        color: 'var(--bs-purple)',
        textColor: 'var(--bs-gray-100)',
    },
    [ProjectTag.CONTROLS]: {
        label: 'Controls',
        color: 'var(--bs-info)',
        textColor: 'var(--bs-gray-900)',
    },
};

export function ProjectTagBadge({ tag }: { tag: ProjectTag }) {
    const style = TAG_STYLES[tag];
    return (
        <span
            style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: style.color,
                color: style.textColor,
                whiteSpace: 'nowrap',
            }}
        >
            {style.label}
        </span>
    );
}

export function ProjectTagList({ tags }: { tags?: ProjectTag[] }) {
    if (!tags || tags.length === 0) return null;
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
            {tags.map((t) => (
                <ProjectTagBadge key={t} tag={t} />
            ))}
        </div>
    );
}
