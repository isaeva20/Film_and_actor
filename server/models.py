from uuid import UUID, uuid4

from sqlalchemy import CheckConstraint, ForeignKey, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    """Базовый класс для таблиц."""

    pass


class UUIDMixin:
    """Класс миксин для поля: id."""

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)


class Actor(UUIDMixin, Base):

    __tablename__ = 'actor'

    first_name: Mapped[int]
    last_name: Mapped[str]
    age: Mapped[int]
    film_id: Mapped[UUID] = mapped_column(ForeignKey('film.id'), nullable=True)
    films: Mapped[list['Film']] = relationship(
       back_populates='actor', cascade='all, delete-orphan',
    )
    __table_args__ = (
        UniqueConstraint('first_name', 'last_name', name='actor_unique_first_last_name'),
        CheckConstraint('length(first_name) < 150 and length(last_name) < 200'),
        CheckConstraint('age > 0'),
    )

class Film(UUIDMixin, Base):

    __tablename__ = 'film'

    title: Mapped[str]
    year: Mapped[str]
    raiting: Mapped[int]
    actor_id: Mapped[UUID] = mapped_column(ForeignKey('actor.id'), nullable=True)
    actors: Mapped[list[Actor]] = relationship(
        back_populates='film', cascade='all, delete-orphan',
    )
    __table_args__ = (
        UniqueConstraint('title', name='film_unique_title'),
        CheckConstraint('length(title) < 200'),
        CheckConstraint('year > 0')
    )